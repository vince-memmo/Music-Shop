import * as Tone from 'tone'
import { Player } from 'tone'
import Drums from './drums'

const hihatHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/hihat.mp3").toDestination()
const kickHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination()
const snareHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/snare.mp3").toDestination()
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now()
const bpm = 500

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


    playSong() {
        if (this.startMusic.innerHTML === 'Start Music') {
            this.startMusic.innerHTML = 'End Music'
        } else {
            this.startMusic.innerHTML = 'Start Music'
        }
        let loopLength = Math.max(...Object.values(this.songHash).map(arr=> arr.length))
        this.playChords(loopLength)
        this.playDrums(loopLength)
    }

    async playChords(loopLength) {
        let chords = []
        while(this.startMusic.innerHTML === 'End Music'){
            for(let i = 0; i < loopLength; i++) {
                if (this.songHash['chords'][i] !== 'rest' && this.songHash['chords'][i] !== undefined) {
                    synth.triggerAttackRelease(this.songHash['chords'][i].slice(1), `${this.songHash['chords'][i].slice(0,1)[0] / (bpm/250)}`); //play sound
                }
                await this.sleep(bpm);
            }
        }
    }

    async playDrums(loopLength) {
        while(this.startMusic.innerHTML === 'End Music'){
            // kickHit.volume.value = 0
            // snareHit.volume.value = 0
            // hihatHit.volume.value = 0
            
            for(let i = 0; i < loopLength; i++) {
                Tone.loaded().then(() => {
                    if (this.songHash['kick'][i] === 'hit' && this.songHash['kick'][i] !== undefined) kickHit.start()
                    if (this.songHash['snare'][i] === 'hit' && this.songHash['snare'][i] !== undefined) snareHit.start()
                    if (this.songHash['hihat'][i] === 'hit' && this.songHash['hihat'][i] !== undefined) hihatHit.start()
                });
                await this.sleep(bpm);
            }
        }
    }
}
export default Play
    
