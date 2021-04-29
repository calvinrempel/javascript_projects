import { DrawableRectangle } from '../../core/drawables/drawable-rectangle.js';
import {GameObject} from '../../core/game/game-object.js';

export class Player extends GameObject {
    constructor() {
        super();
        this.width = 25
        this.length=75
    }
    create() {
        this.addDrawable(new DrawableRectangle(0,0, this.width, this.length,'white') )
    }
        
    

    // create() {
    //     // this.addDrawable(new DrawableImage(0, 0, size, size, this.getImage('./media/images/asteroid.png')));
    //     //this.addCollider(new CircleCollider('ASTEROID', this, this.radius, this.radius, this.radius, []));
    // }
}