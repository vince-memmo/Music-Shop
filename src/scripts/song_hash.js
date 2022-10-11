import * as Tone from 'tone'
import Chord from './chords'
import Drums from './drums'

class SongHash {
    constructor() {
        this.queue = []
        this.songHash = {}
        this.songHash['kick'] = []
        this.songHash['snare'] = []
        this.songHash['hihat'] = []
        this.songHash['chords'] = []

        this.chord = new Chord()
        this.queueChord = this.queueChord.bind(this)

        this.drums = new Drums()
        this.queueDrums = this.queueDrums.bind(this)

        this.moveToQueue = document.querySelector('.enter-chord')
        this.moveToQueue.addEventListener("click", this.queueChord)

        this.moveToQueue = document.querySelector('.enter-drums')
        this.moveToQueue.addEventListener("click", this.queueDrums)
    }

    queueChord() {
        let chordArray = this.chord.setUpChordArray()
        this.songHash['chords'] = this.songHash['chords'].concat(chordArray)
    }

    queueDrums() {
        console.log('add drums to hash')
        let drumsHash = this.drums.setUpDrumsHash()
        this.songHash['kick'] = this.songHash['kick'].concat(drumsHash['kick'])
        this.songHash['snare'] = this.songHash['snare'].concat(drumsHash['snare'])
        this.songHash['hihat'] = this.songHash['hihat'].concat(drumsHash['hihat'])
    }
    
    getQueue() {
        return this.songHash
    }
}

export default SongHash
