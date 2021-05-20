import{DrawableCircle} from '../../core/drawables/drawable-circle.js';
import { GameObject } from '../../core/game/game-object.js';

const Direction = {
    upLeft: 'UpLeft',
    upRight: 'UpRight',
    downLeft: 'DownLeft',
    downRight: 'DownRight',
    
};

const DirectionNumber = {
    0: Direction.upLeft,
    1: Direction.upRight,
    2:Direction.downLeft,
    3:Direction.downRight,
};

export class ball extends GameObject {
    constructor(x, y) {
        super({x, y,});
        this.radius = 4;
        this.color = 'white';
        this.direction = this.chooseFirstDirection();
        this.speed= 50
    }
    
    create() {
        //DrawableCircle
        this.addDrawable(new DrawableCircle(0, 0, this.radius, this.color));
    }

    update(secondsDifference) {
        if(this.direction === Direction.upLeft) {
            this.y= this.y-this.speed * secondsDifference;
            this.x= this.x - this.speed * secondsDifference;
        }
        else if ( this.direction === Direction.downLeft){
            this.y= this.y + this.speed * secondsDifference;
            this.x= this.x - this.speed * secondsDifference;
        }
        else if ( this.direction === Direction.upRight){
            this.y= this.y - this.speed * secondsDifference;
            this.x= this.x + this.speed * secondsDifference;
        }
        else if ( this.direction === Direction.downRight){
            this.y= this.y + this.speed * secondsDifference;
            this.x= this.x + this.speed * secondsDifference;
        }
    }

    chooseFirstDirection() {
        const directionNumber = Math.floor(Math.random() * 4);
        return DirectionNumber[directionNumber];
    }

    bounce() {
    }
}
    