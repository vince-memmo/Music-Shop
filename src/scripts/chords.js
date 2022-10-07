import * as Tone from 'tone'
console.log('chords working!')
const selectionNotes = ['C','Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']; 
const chordNotes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4','Bb4', 'B4']; 


class Chord {
    constructor () {
        this.playChords = document.querySelector('.play-chords')
        this.playMusic = this.playMusic.bind(this)
        this.setupNotesSelection = this.setupNotesSelection.bind(this)
        this.playChords.addEventListener("click", this.playMusic)
    }
    
    setupNotesSelection() {
        debugger
        selectionNotes.forEach(noteName => {
            let noteNameOption = document.createElement('option', noteName);
            let noteSelector = document.getElementById('chord-key')
            noteSelector.appendChild(noteNameOption);
            noteNameOption.innerHTML = noteName
        });
    }

    playMusic() {
        console.log('play music worked')
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        let startNote = document.getElementById('chord-key').value + '4'
        const startNoteIdx = chordNotes.indexOf(startNote)
        const now = Tone.now()
        const root = chordNotes[startNoteIdx]
        const third = chordNotes[(startNoteIdx+4) % 12]
        const minorThird = chordNotes[(startNoteIdx+3) % 12]
        const fifth = chordNotes[(startNoteIdx+7) % 12]
        const seventh = chordNotes[(startNoteIdx+10) % 12]
        let chordArray = []
        
        if (document.getElementById('chord-type-maj').checked && document.getElementById('7th').checked) {
            chordArray = [root, third, fifth, seventh]
        } else if (document.getElementById('chord-type-min').checked && document.getElementById('7th').checked) {
            chordArray = [root, minorThird, fifth, seventh]
        } else if (document.getElementById('chord-type-maj').checked) {
            chordArray = [root, third, fifth]
        } else {
            chordArray = [root, minorThird, fifth]
        }

        synth.triggerAttack(chordArray, now);
        synth.triggerRelease(chordArray, now + 1);
    }
}

export default Chord






// let audio = new Audio("4_count_patt_002.mp3")
// audio.play()