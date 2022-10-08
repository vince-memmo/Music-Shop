import * as Tone from 'tone'
import ChordQueue from './chordQueue'

class Play {
    constructor(chordQueue) {
        this.play = this.play.bind(this)
        this.chordQueue = chordQueue
        this.sleep = this.sleep.bind(this)
        this.playSong = document.querySelector('.play')
        this.playSong.addEventListener("click", this.play)
    }

    async sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    async play() { 
        
        for (let i = 0; i < this.chordQueue.length; i++){
            console.log(`play ${this.chordQueue[i]}`)
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
            const now = Tone.now()
            synth.triggerAttack(this.chordQueue[i], now); //play sound
            synth.triggerRelease(this.chordQueue[i], now + 4); //end sound
            await this.sleep(4000);
        }
    }
}
                    
                    

export default Play
