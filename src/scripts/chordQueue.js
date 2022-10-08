import * as Tone from 'tone'
import Chord from './chords'

class ChordQueue {
    constructor() {
        this.queue = []
        this.chord = new Chord()
        this.queueChord = this.queueChord.bind(this)
        this.moveToQueue = document.querySelector('.enter-chord')
        this.moveToQueue.addEventListener("click", this.queueChord)
    }

    queueChord() {
        let chordArray = this.chord.setUpChordArray()
        this.queue.push(chordArray)
    }
    
    getQueue() {
        return this.queue
    }
}

export default ChordQueue
//ChordQueue.queueChord()