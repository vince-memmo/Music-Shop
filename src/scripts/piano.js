import * as Tone from 'tone'

const whiteNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
const whiteNotesCompKeys = ['s', 'd', 'f', 'g', 'h', 'j', 'k']
const blackNotes = ['Db4', 'Eb4', 'F#4', 'G#4', 'Bb4']
const blackNotesCompKeys = ['e', 'r', 'y', 'u', 'i']

const piano = new Tone.Sampler({
    urls: {
        A0: "A0.mp3",
        C1: "C1.mp3",
        A1: "A1.mp3",
        C2: "C2.mp3",
        A2: "A2.mp3",
        C3: "C3.mp3",
        A3: "A3.mp3",
        C4: "C4.mp3",
        A4: "A4.mp3",
        C5: "C5.mp3",
        
    },
    release: 1,
    baseUrl: "https://kernapillar.github.io/4-block-loop/src/piano_samples/"
}).toDestination();

piano.volume.value = -6
piano.release = 2

class Piano {
    constructor() {
    }

    playNote(key) {
        if (whiteNotesCompKeys.includes(key)) {
            const idx = whiteNotesCompKeys.indexOf(key)
            const noteEl = document.getElementById(whiteNotes[idx].slice(0,1))
            noteEl.style.backgroundColor = 'lightgrey'
            setTimeout(function(){
                noteEl.style.backgroundColor = 'ivory'
            }, 350)
            if (key === whiteNotesCompKeys[0]) piano.triggerAttackRelease([whiteNotes[0]], 0.5)
            if (key === whiteNotesCompKeys[1]) piano.triggerAttackRelease([whiteNotes[1]], 0.5)
            if (key === whiteNotesCompKeys[2]) piano.triggerAttackRelease([whiteNotes[2]], 0.5)
            if (key === whiteNotesCompKeys[3]) piano.triggerAttackRelease([whiteNotes[3]], 0.5)
            if (key === whiteNotesCompKeys[4]) piano.triggerAttackRelease([whiteNotes[4]], 0.5)
            if (key === whiteNotesCompKeys[5]) piano.triggerAttackRelease([whiteNotes[5]], 0.5)
            if (key === whiteNotesCompKeys[6]) piano.triggerAttackRelease([whiteNotes[6]], 0.5)
        }

        if (blackNotesCompKeys.includes(key)) {
            const idx = blackNotesCompKeys.indexOf(key)
            const noteEl = document.getElementById(blackNotes[idx].slice(0,2))
            noteEl.style.backgroundColor = 'darkgrey'
            setTimeout(function(){
                noteEl.style.backgroundColor = 'black'
            }, 350)
            if (key === blackNotesCompKeys[0]) piano.triggerAttackRelease([blackNotes[0]], 0.5)
            if (key === blackNotesCompKeys[1]) piano.triggerAttackRelease([blackNotes[1]], 0.5)
            if (key === blackNotesCompKeys[2]) piano.triggerAttackRelease([blackNotes[2]], 0.5)
            if (key === blackNotesCompKeys[3]) piano.triggerAttackRelease([blackNotes[3]], 0.5)
            if (key === blackNotesCompKeys[4]) piano.triggerAttackRelease([blackNotes[4]], 0.5)
        }
    }
    

}


export default Piano

document.getElementById('.C')