import { DrawableRectangle } from '../../core/drawables/drawable-rectangle.js';
import { RectCollider } from '../../core/game/game-collider.js';
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
        this.addCollider(new RectCollider('player', this, 0, 0, this.width, this.length, []))

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
        this.faster(secondsDifference)
        
    }
    faster(secondsDifference){
        this.speed = this.speed + 1 * secondsDifference
    }
    reset(){
        this.speed=75
    }
}
