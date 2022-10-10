import Chord from './scripts/chords'
import ChordQueue from './scripts/chordQueue'
import Play from './scripts/play'
import Kick from './scripts/drums'
import DrumsSetup from './scripts/drums_setup'
import SetupPiano from './scripts/setup_piano'
import Piano from './scripts/piano'


document.addEventListener("DOMContentLoaded", () => {
    let queueOfChord = []
    
    console.log('in index!')

    const setUpPiano = new SetupPiano()
    setUpPiano.setupPiano()

    const piano = new Piano()
    window.addEventListener("keydown", (e) => piano.playNote(e.key));
    
    const drums = new DrumsSetup()
    drums.addFirstMeasure()

    const chord = new Chord()
    chord.setupNotesSelection()
    const queueChord = new ChordQueue()
    
    const play = new Play(queueChord.getQueue())
})