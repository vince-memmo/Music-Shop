import * as Tone from 'tone'
import { Player } from 'tone'
import Kick from './kick'

class Play {
    constructor(chordQueue) {
        this.play = this.play.bind(this)
        this.chordQueue = chordQueue
        this.sleep = this.sleep.bind(this)
        
        this.kick = new Kick()
        
        this.playSong = document.querySelector('.play')
        this.playSong.addEventListener("click", this.play)
    }
    
    async sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    async play() { 
        const kickArray = this.kick.setUpKickArray()
        
        for (let i = 0; i < this.chordQueue.length; i++){
            console.log(`play ${this.chordQueue[i]}`)
            const synth = new Tone.PolySynth(Tone.Synth).toDestination();
            const now = Tone.now()
            let chordArray = this.chordQueue[i]['chordArray'][0]
            let duration = this.chordQueue[i]['duration']
            synth.triggerAttack(chordArray, now); //play sound
            synth.triggerRelease(chordArray, now + duration); //end sound
            await this.sleep(duration*1000);
        }
    }
    
}

export default Play


// const kickHit = new Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination();
// Tone.loaded().then(() => {
//     kickHit.start();
// });