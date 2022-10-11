import Chord from './scripts/chords'
import SongHash from './scripts/song_hash'
import Play from './scripts/play'
import Kick from './scripts/drums'
import DrumsSetup from './scripts/drums_setup'
import SetupPiano from './scripts/setup_piano'
import Piano from './scripts/piano'


document.addEventListener("DOMContentLoaded", () => {

    const startScreen = document.querySelector('.start-screen')
    const startButton = document.querySelector('.start')
    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none'
    })

    const instructionsButton = document.querySelector('.start')
    startButton.addEventListener('click', function() {
        startScreen.style.display = 'none'
    })

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

    const songQueue = new SongHash()
    
    const play = new Play(songQueue.getQueue())
})