import Chord from './scripts/chords'
import ChordQueue from './scripts/chordQueue'
import Play from './scripts/play'


document.addEventListener("DOMContentLoaded", () => {
    let queueOfChord = []
    
    console.log('in index!')
    
    const chord = new Chord()
    chord.setupNotesSelection()
    const queueChord = new ChordQueue()

    
    const play = new Play(queueChord.getQueue())


})