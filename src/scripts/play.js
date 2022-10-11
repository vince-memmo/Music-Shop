import * as Tone from 'tone'
import { Player } from 'tone'
import Drums from './drums'

const hihatHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/hihat.mp3").toDestination()
const kickHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination()
const snareHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/snare.mp3").toDestination()
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now()
const eighth = 250

class Play {
    constructor(songHash) {
        this.playChords = this.playChords.bind(this)
        this.playDrums = this.playDrums.bind(this)
        this.playSong = this.playSong.bind(this)

        this.songHash = songHash
        this.sleep = this.sleep.bind(this)
        
        this.drums = new Drums()
        
        this.startMusic = document.querySelector('.start-music')
        this.startMusic.addEventListener("click", this.playSong)

        this.drumLoopAtTop = true
    }
    
    async sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    
    async playSong() {
        if (this.startMusic.innerHTML === 'Start Music') {
            this.startMusic.innerHTML = 'End Music'
        } else {
            this.startMusic.innerHTML = 'Start Music'
        }

        Tone.loaded().then(() => {
            kickHit.volume.value = -100
            kickHit.start();
        });
        Tone.loaded().then(() => {
            snareHit.volume.value = -100
            snareHit.start();
        });
        Tone.loaded().then(() => {
            hihatHit.volume.value = -100
            hihatHit.start();
        });

        let loopLength = Math.max(...Object.values(this.songHash).map(arr=> arr.length))
        debugger

        while(this.startMusic.innerHTML === 'End Music'){
            kickHit.volume.value = 0
            snareHit.volume.value = 0
            hihatHit.volume.value = 0
            
            for(let i = 0; i < loopLength; i++) {
                if (this.songHash['chords'][i] !== 'rest' && this.songHash['chords'][i] !== undefined) {
                    synth.triggerAttack(this.songHash['chords'][i], now); //play sound
                    synth.triggerRelease(this.songHash['chords'][i], now + duration/4); //end sound
                }

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
                
                await this.sleep(eighth);
            }
        }

    }
    
    async playChords() {
            for (let i = 0; i < this.chordQueue.length; i++){
                console.log(`play ${this.chordQueue[i]}`)
                let chordArray = this.chordQueue[i]['chordArray'][0]
                let duration = this.chordQueue[i]['time']
                synth.triggerAttack(chordArray, now); //play sound
                synth.triggerRelease(chordArray, now + duration/2); //end sound
                await this.sleep(duration*500);
            }

    }
    
    async playDrums() {
        let chordsTripped = false
        
        if (this.loopDrums.innerHTML === 'Loop Drums') {
            this.loopDrums.innerHTML = 'Break Drum Loop'
        } else {
            this.loopDrums.innerHTML = 'Loop Drums'
        }
        
        
        Tone.loaded().then(() => {
            kickHit.volume.value = -100
            kickHit.start();
        });
        Tone.loaded().then(() => {
            snareHit.volume.value = -100
            snareHit.start();
        });
        Tone.loaded().then(() => {
            hihatHit.volume.value = -100
            hihatHit.start();
        });
        
        
        let drumsHash = this.drums.setUpDrums()
        
        
        while(this.loopDrums.innerHTML === 'Break Drum Loop'){
            kickHit.volume.value = 0
            snareHit.volume.value = 0
            hihatHit.volume.value = 0
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
                
                await this.sleep(250);
                this.drumLoopAtTop = true
            }
        }
    }
}

export default Play

