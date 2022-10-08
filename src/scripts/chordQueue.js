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
        let chordHash = this.chord.setUpchordHash()
        this.queue.push(chordHash)
    }
    
    getQueue() {
        return this.queue
    }
}

export default ChordQueue
