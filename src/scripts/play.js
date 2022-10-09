import * as Tone from 'tone'
import { Player } from 'tone'
import Drums from './drums'

class Play {
    constructor(chordQueue) {
        this.play = this.play.bind(this)
        this.playChords = this.playChords.bind(this)
        this.playDrums = this.playDrums.bind(this)

        this.chordQueue = chordQueue
        this.sleep = this.sleep.bind(this)
        
        this.drums = new Drums()

        this.playSong = document.querySelector('.play')
        this.playSong.addEventListener("click", this.play)
        
        this.playSong = document.querySelector('.play-chords')
        this.playSong.addEventListener("click", this.playChords)

        this.playSong = document.querySelector('.play-kick')
        this.playSong.addEventListener("click", this.playKick)
    }
    
    async sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    play() {
        this.playDrums()
        this.playChords()
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
    
    async playDrums() {  
        let drumsHash = this.drums.setUpDrums()
        debugger
        const kickHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination();
        const snareHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination();
        const hihateHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination();

        for(let i = 0; i < kickArray.length; i++) {
            if (kickArray[i] === 'hit'){
                Tone.loaded().then(() => {
                    kickHit.start();
                });
            }
            await this.sleep(500);
        }
        kickArray = []
    }

}

export default Play
