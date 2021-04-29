export class GameMedia {
    constructor() {
        this.images = {};
        this.assetURLs = [];
        this.loadingCounter = 0;
    }

    addImages(imageURLS) {
        this.assetURLs = imageURLS;
    }

    getImage(imageURL) {
        return this.images[imageURL];
    }

    load(onComplete) {
        this.loadingCounter = this.assetURLs.length;
        this.assetURLs.forEach(imgUrl => {
            const img = new Image();
            img.onload = () => {
                this.loadingCounter--;
                this.images[imgUrl] = img;

                // If last image is loaded, indicate that we're done
                if (!this.isLoading()) {
                    onComplete();
                }
            }
            img.src = imgUrl;
        });

        // If nothing to load, indicate that we're done
        if (this.assetURLs.length === 0) {
            onComplete();
        }
    }

    isLoading() {
        return this.loadingCounter > 0;
    }
}