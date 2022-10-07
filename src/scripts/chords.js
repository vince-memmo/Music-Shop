import * as Tone from 'tone'
console.log('chords working!')

class Chord {
    constructor () {
        this.pickChordKey = document.querySelector('.chord-key')
        this.pickChordType = document.querySelector('.chord-type')
        this.playChords = document.querySelector('.play-chords')
        debugger
        this.playMusic = this.playMusic.bind(this)
        this.playChords.addEventListener("click", this.playMusic)
    }

    playMusic() {
        console.log('play music worked')
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        const now = Tone.now()
        synth.triggerAttack("D4", now);
        synth.triggerAttack("F4", now);
        synth.triggerAttack("A4", now);
        synth.triggerAttack("C5", now);
        synth.triggerAttack("E5", now);
        synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
    }

}

export default Chord






// let audio = new Audio("4_count_patt_002.mp3")
// audio.play()