import Chord from './scripts/chords'
import ChordQueue from './scripts/chordQueue'
import Play from './scripts/play'
import Kick from './scripts/drums'
import DrumsSetup from './scripts/drums_setup'


document.addEventListener("DOMContentLoaded", () => {
    let queueOfChord = []
    
    console.log('in index!')
    
    const drums = new DrumsSetup()
    drums.addFirstMeasure()

    const chord = new Chord()
    chord.setupNotesSelection()
    const queueChord = new ChordQueue()
    
    const play = new Play(queueChord.getQueue())
})