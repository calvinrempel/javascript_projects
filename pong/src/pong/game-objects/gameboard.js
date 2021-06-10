import {GameObject} from '../../core/game/game-object.js';
import {DrawableText} from '../../core/drawables/drawable-text.js';
 export class gameboard extends GameObject{
    constructor() {
        super();
        this.playerScore = 0;
        this.botScore= 0;
    }

    create() {
        this.addDrawable(new DrawableText(220, 150, 'white', () => this.playerScore, {size: '32px'}));
        this.addDrawable(new DrawableText(320, 150, 'white', ()=> this.botScore, {size: '32px'}));
    }
        
    addPointForPlayer() {
        this.playerScore = this.playerScore + 1;

    } 
    addPointForBot() {
        this.botScore = this.botScore + 1;
    }
    
}


