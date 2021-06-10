import { Player} from './player.js';
import { Direction } from './ball.js'


export class BotPlayer extends Player {
    constructor(x, y, ball) {
        super(x,y);
        this.ball = ball;
    }
        
    update(secondsDifference) {
        if( this.ball.direction === Direction.upRight && this.ball.y < this.y) {
            this.y -= this.speed * secondsDifference;
            this.y = Math.max(this.y, 0);
        }
        else if(this.ball.direction === Direction.downRight && this.ball.y > this.y) {
            this.y += this.speed * secondsDifference;
            const gameSize = this.getGameSize();
            this.y = Math.min(this.y, gameSize.height - this.length);
        }
        this.faster(secondsDifference)
        
    }
}
