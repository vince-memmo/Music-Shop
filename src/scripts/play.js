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
        this.playTime = this.playTime.bind(this)

        this.songHash = songHash
        this.sleep = this.sleep.bind(this)
        
        this.drums = new Drums()
        
        this.startMusic = document.querySelector('.start-music')
        this.startMusic.addEventListener("click", this.playSong)

        this.muteChordsButton = document.querySelector('.mute-chords')
        this.muteChordsButton.addEventListener("click", muteChords)
        this.muteDrumsButton = document.querySelector('.mute-drums')
        this.muteDrumsButton.addEventListener("click", muteDrums)
        this.muteButton = document.querySelector('.mute-all')
        this.muteButton.addEventListener("click", muteAll)
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
        this.playTime(loopLength)
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

    async playTime(loopLength) {
        while(this.startMusic.innerHTML === 'End Music'){            
            for(let i = 0; i < loopLength; i++) {
                let timeBoxCurrentOn = document.getElementById(`${i-1}-tick-on`)
                let timeBoxCurrentOff = document.getElementById(`${i-1}-tick-off`)
                if (timeBoxCurrentOn === null){
                    timeBoxCurrentOn = document.getElementById(`${loopLength-1}-tick-on`)
                    timeBoxCurrentOff = document.getElementById(`${loopLength-1}-tick-off`)
                }    
                let timeBoxNextOn = document.getElementById(`${i}-tick-on`)
                let timeBoxNextOff = document.getElementById(`${i}-tick-off`)

                timeBoxCurrentOn.style.display = 'none'
                timeBoxCurrentOff.style.display = 'block'

                timeBoxNextOn.style.display = 'block'
                timeBoxNextOff.style.display = 'none'
                await this.sleep(bpm);
            }
        }
    }

    
}

function muteDrums() {
    console.log("mute drums")
    if (kickHit.volume.value === -Infinity) {
        kickHit.volume.value = 0
        snareHit.volume.value = 0
        hihatHit.volume.value = 0
    } else if (kickHit.volume.value === 0){
        kickHit.volume.value = -Infinity
        snareHit.volume.value = -Infinity
        hihatHit.volume.value = -Infinity
    }
}

function muteChords() {
    console.log("mute chords")
    if (synth.volume.value === 0) {
        synth.volume.value = -Infinity
    } else if (synth.volume.value === -Infinity){
        synth.volume.value = 0
    }
}

function muteAll() {
    muteChords()
    muteDrums()
}

export default Play

