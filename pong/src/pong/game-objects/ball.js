import{DrawableCircle} from '../../core/drawables/drawable-circle.js';
import { CircleCollider } from '../../core/game/game-collider.js';
import { GameObject } from '../../core/game/game-object.js';

export const Direction = {
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
        this.speed= 75
        this.onPointScoredFn = () => {};
    }
    
    create() {
        //DrawableCircle
        this.addDrawable(new DrawableCircle(0, 0, this.radius, this.color));
        this.addCollider(new CircleCollider('ball', this, 0 , 0 ,this.radius, ['player'] ));
    }
    onCollision(){
        this.bounceOffPlayer();
    }

    onPointScored(fn) {
        this.onPointScoredFn = fn;
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
        this.reset();
        this.bounce();
        this.faster(secondsDifference);

    }

    reset(){
        const {width, height} = this.getGameSize(); 
        if(this.x >= width || this.x <= 0){
            this.onPointScoredFn(this.x >= width); // (true) = Player Score || (false) = Bot scored
            this.y = height / 2;
            this.x= width / 2;
            this.direction = this.chooseFirstDirection();
            this.speed = 75
        }
    }

    chooseFirstDirection() {
        const directionNumber = Math.floor(Math.random() * 4);
        return DirectionNumber[directionNumber];
    }

    bounce() {
        if(this.y >= 300 || this.y <= 0 ){
            if(this.direction === Direction.upLeft){
                this.direction = Direction.downLeft;
            }
            else if(this.direction === Direction.upRight){
                this.direction = Direction.downRight;
            }
            else if(this.direction === Direction.downLeft){
                this.direction = Direction.upLeft;
            }
            else if(this.direction === Direction.downRight){
                this.direction = Direction.upRight;
            }
        }
    }
    
    bounceOffPlayer(){
        if(this.direction === Direction.upLeft){
            this.direction = Direction.upRight;
        }
        else if(this.direction === Direction.upRight){
            this.direction = Direction.upLeft;
        }
        else if(this.direction === Direction.downLeft){
            this.direction = Direction.downRight;
        }
        else if(this.direction === Direction.downRight){
            this.direction = Direction.downLeft;
        }
    }

    faster(secondsDifference) {
        this.speed = this.speed + 1 * secondsDifference;
    }
}

    