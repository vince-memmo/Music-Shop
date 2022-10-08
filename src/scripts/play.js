import * as Tone from 'tone'
import ChordQueue from './chordQueue'

class Play {
    constructor(chordQueue) {
        this.playChords = this.playChords.bind(this)
        this.chordQueue = chordQueue
        this.sleep = this.sleep.bind(this)
        this.playSong = document.querySelector('.play')
        this.playSong.addEventListener("click", this.playChords)
    }

    async sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    
    async playChords() { 
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
