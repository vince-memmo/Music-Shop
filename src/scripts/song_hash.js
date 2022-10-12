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

        this.deleteChord = this.deleteChord.bind(this)
        this.deleteDrums = this.deleteDrums.bind(this)

        this.moveChordToQueue = document.querySelector('.enter-chord')
        this.moveChordToQueue.addEventListener("click", this.queueChord)

        this.moveDrumsToQueue = document.querySelector('.enter-drums')
        this.moveDrumsToQueue.addEventListener("click", this.queueDrums)

        this.deleteChordFromQueue = document.querySelector('.delete-chord')
        this.deleteChordFromQueue.addEventListener("click", this.deleteChord)

        this.deleteDrumsFromQueue = document.querySelector('.delete-drums')
        this.deleteDrumsFromQueue.addEventListener("click", this.deleteDrums)
    }

    queueChord() {
        let chordArray = this.chord.setUpChordArray()
        this.songHash['chords'] = this.songHash['chords'].concat(chordArray)
        
        let chordsScroller = document.querySelector('.chords-scroller-region')
        let chordEl = document.createElement('div')
        chordEl.setAttribute('class', `display-chord`)
        chordEl.style.width = `${chordArray[0][0] * 8}` + 'px'
        console.log(chordArray[0][0] * 8)
        chordEl.setAttribute('duration', `${chordArray[0][0]}`) 
        chordEl.id = `${chordArray[0][1]}`
        chordEl.innerHTML = `${chordArray[0][1]}`
        chordsScroller.appendChild(chordEl)
    }
    
    queueDrums() {
        console.log('add drums to hash')
        let drumsHash = this.drums.setUpDrumsHash()
        this.songHash['kick'] = this.songHash['kick'].concat(drumsHash['kick'])
        this.songHash['snare'] = this.songHash['snare'].concat(drumsHash['snare'])
        this.songHash['hihat'] = this.songHash['hihat'].concat(drumsHash['hihat'])
        
        let drumsScroller = document.querySelector('.drums-scroller-region')
        let drumEl = document.createElement('div')
        drumEl.setAttribute('class', `display-drums`)
        drumEl.style.width = `${drumsHash['hihat'].length*8}` + 'px'
        console.log(drumsHash['hihat'].length*8)
        drumEl.setAttribute('duration', `${drumsHash['hihat'].length}`) 
        drumsScroller.appendChild(drumEl)
    }
    
    deleteChord() {
        let lastChord = document.querySelector('.chords-scroller-region').lastChild
        let duration = lastChord.getAttribute('duration')
        let i = 0
        while (i < duration){
            const note = this.songHash['chords'].pop()
            i++
        }
        lastChord.remove()
        debugger
    }

    deleteDrums() {
        let lastDrums = document.querySelector('.drums-scroller-region').lastChild
        let duration = lastDrums.getAttribute('duration')
        let i = 0
        while (i < duration){
            const kick = this.songHash['kick'].pop()
            const snare = this.songHash['snare'].pop()
            const hihat = this.songHash['hihat'].pop()
            i++
        }
        lastDrums.remove()
    }

    getQueue() {
        return this.songHash
    }
}

export default SongHash
