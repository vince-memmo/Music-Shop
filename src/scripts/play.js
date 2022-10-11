import * as Tone from 'tone'
import { Player } from 'tone'
import Drums from './drums'

const hihatHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/hihat.mp3").toDestination()
const kickHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination()
const snareHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/snare.mp3").toDestination()
class Play {
    constructor(chordQueue) {
        this.playChords = this.playChords.bind(this)
        this.playDrums = this.playDrums.bind(this)
        this.loopChordsFunc = this.loopChordsFunc.bind(this)

        this.chordQueue = chordQueue
        this.sleep = this.sleep.bind(this)
        
        this.drums = new Drums()
        
        this.loopChords = document.querySelector('.loop-chords')
        this.loopChords.addEventListener("click", this.loopChordsFunc)

        this.loopDrums = document.querySelector('.loop-drums')
        this.loopDrums.addEventListener("click", this.playDrums)
        this.drumLoopAtTop = true
    }
    
    async sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    loopChordsFunc() {
        if (this.loopChords.innerHTML === 'Loop Chords') {
            this.loopChords.innerHTML = 'Break Chord Loop'
        } else {
            this.loopChords.innerHTML = 'Loop Chords'
        }
    }
    
    async playChords() { 
        while (this.loopChords.innerHTML === 'Break Chord Loop') {
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
    
    async playDrums() {
        let chordsTripped = false

        if (this.loopDrums.innerHTML === 'Loop Drums') {
            this.loopDrums.innerHTML = 'Break Drum Loop'
        } else {
            this.loopDrums.innerHTML = 'Loop Drums'
        }

        let drumsHash = this.drums.setUpDrums()

        for(let i = 0; i < 4; i++) {
            await this.sleep(500);
        }        

        while(this.loopDrums.innerHTML === 'Break Drum Loop'){
            if (this.loopChords.innerHTML === 'Break Chord Loop' && chordsTripped === false) {
                this.playChords()
                chordsTripped = true
            }
            this.drumLoopAtTop = false
            for(let i = 0; i < drumsHash['kick'].length; i++) {
                if (drumsHash['kick'][i] === 'hit'){
                    Tone.loaded().then(() => {
                        kickHit.start();
                    });
                }

                if (drumsHash['snare'][i] === 'hit'){
                    Tone.loaded().then(() => {
                        snareHit.start();
                    });
                }

                if (drumsHash['hihat'][i] === 'hit'){
                    Tone.loaded().then(() => {
                        hihatHit.start();
                    });
                }

                await this.sleep(500);
                this.drumLoopAtTop = true
            }
        }
        drumsHash = {}
    }
}

export default Play
