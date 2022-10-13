import * as Tone from 'tone'
import { Player } from 'tone'
import Drums from './drums'

const hihatHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/hihat.mp3").toDestination()
const kickHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/kick.mp3").toDestination()
const snareHit = new Tone.Player("https://kernapillar.github.io/4-block-loop/src/drum_samples/snare.mp3").toDestination()
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const now = Tone.now()

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
        if (this.songHash['kick'].length === 0 && this.songHash['snare'].length === 0 && this.songHash['hihat'].length === 0 && this.songHash['chords'].length === 0) return
        
        if (this.startMusic.innerHTML === 'Play') {
            synth.volume.value = 0
            this.startMusic.innerHTML = 'End Music'
        } else {
            this.startMusic.innerHTML = 'Play'
        }

        if (parseInt(document.querySelector('.bpm').value) < 60 || parseInt(document.querySelector('.bpm').value) > 200) {
            alert("BPM must be between 60 and 200")
            return
        } 

        const bpm = 1000/(parseInt(document.querySelector('.bpm').value) / 60)
        const loopLength = Math.max(...Object.values(this.songHash).map(arr=> arr.length))

        this.playTime(loopLength, bpm)
        this.playChords(loopLength, bpm)
        this.playDrums(loopLength, bpm)
    }

    async playChords(loopLength, bpm) {
        
        let chords = []
        while(this.startMusic.innerHTML === 'End Music'){
            for(let i = 0; i < loopLength; i++) {
                if (this.startMusic.innerHTML === 'Play') {
                    synth.volume.value = -Infinity
                    return
                }
                if (this.songHash['chords'][i] !== 'rest' && this.songHash['chords'][i] !== undefined) {
                    synth.triggerAttackRelease(this.songHash['chords'][i].slice(1), `${this.songHash['chords'][i][0] * (bpm/1000)}`); //play sound
                    chords = this.songHash['chords'][i].slice(1)
                }
                await this.sleep(bpm);
            }
        }
    }

    //[i].slice(0,1)

    async playDrums(loopLength, bpm) {
        while(this.startMusic.innerHTML === 'End Music'){
            for(let i = 0; i < loopLength; i++) {
                if (this.startMusic.innerHTML === 'Play') return
                Tone.loaded().then(() => {
                    if (this.songHash['kick'][i] === 'hit' && this.songHash['kick'][i] !== undefined) kickHit.start()
                    if (this.songHash['snare'][i] === 'hit' && this.songHash['snare'][i] !== undefined) snareHit.start()
                    if (this.songHash['hihat'][i] === 'hit' && this.songHash['hihat'][i] !== undefined) hihatHit.start()
                });
                await this.sleep(bpm);
            }
        }
    }

    async playTime(loopLength, bpm) {
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

                if (this.startMusic.innerHTML === 'Play') {
                    timeBoxCurrentOn.style.display = 'none'
                    timeBoxCurrentOff.style.display = 'block'
                    timeBoxNextOn.style.display = 'none'
                    timeBoxNextOff.style.display = 'block'
                    return
                }

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
    let button = document.querySelector('.mute-drums')
    if (button.innerHTML === 'Mute Drums') {
        button.innerHTML = 'Unmute Drums'
    } else {
        button.innerHTML = 'Mute Drums'
    }

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
    let button = document.querySelector('.mute-chords')
    if (button.innerHTML === 'Mute Chords') {
        button.innerHTML = 'Unmute Chords'
    } else {
        button.innerHTML = 'Mute Chords'
    }

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

