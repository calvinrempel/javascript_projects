import { DrawableRectangle } from '../../core/drawables/drawable-rectangle.js';
import {GameObject} from '../../core/game/game-object.js';

export class Player extends GameObject {
    constructor(x, y) {
        super({x,y});
        this.width = 25;
        this.length=75;
        this.speed = 70;
        
    }
    create() {
        this.addDrawable(new DrawableRectangle(0,0, this.width, this.length,'white') )

    }
        
    update(secondsDifference) {
        if(this.getInput().isKeyDown('ArrowUp')) {
            this.y -= this.speed * secondsDifference;
            
            this.y = Math.max(this.y, 0);
            
        }
        else if(this.getInput().isKeyDown('ArrowDown')) {
            this.y += this.speed * secondsDifference;

            const gameSize = this.getGameSize();
            this.y = Math.min(this.y, gameSize.height - this.length);
        }
        
    }
    
    // create() {
    //     // this.addDrawable(new DrawableImage(0, 0, size, size, this.getImage('./media/images/asteroid.png')));
    //     //this.addCollider(new CircleCollider('ASTEROID', this, this.radius, this.radius, this.radius, []));
    // }
}
