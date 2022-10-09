import Chord from './scripts/chords'
import ChordQueue from './scripts/chordQueue'
import Play from './scripts/play'
import Kick from './scripts/kick'


document.addEventListener("DOMContentLoaded", () => {
    let queueOfChord = []
    
    console.log('in index!')
    
    const chord = new Chord()
    chord.setupNotesSelection()
    const queueChord = new ChordQueue()
    // const kick = new Kick()

    
    const play = new Play(queueChord.getQueue())


})