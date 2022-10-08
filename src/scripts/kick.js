import * as Tone from 'tone'
console.log('kick working!')
import { Player } from 'tone';

class Kick {
    constructor () {
        this.setUpKickArray = this.setUpKickArray.bind(this)
        this.setupDrumssSelection = this.setupDrumsSelection.bind(this)
    }
    
    setUpKickArray() {
        
    }

    setKick() {
        const kick = new Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/hihat2.mp3").toDestination();
    }
    

}