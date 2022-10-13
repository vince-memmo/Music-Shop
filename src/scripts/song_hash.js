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
        if (chordArray.length + this.songHash['chords'].length > 48){
            alert("You cannot have more than 12 measures")
        } else if (!(chordArray[0][0] > 0)){
            alert("Duration must be greater than 0")
        } else {
            this.songHash['chords'] = this.songHash['chords'].concat(chordArray)
            let chordsScroller = document.querySelector('.chords-scroller-region')
            let chordEl = document.createElement('div')
            chordEl.setAttribute('class', `display-chord`)
            chordEl.style.width = `${chordArray[0][0] * 20}` + 'px'
            chordEl.setAttribute('duration', `${chordArray[0][0]}`) 
            chordEl.id = `${chordArray[0][1]}`
            if (document.querySelector('.chord-type_maj').checked === true) {
                if (chordArray[0].length === 5) {
                    chordEl.innerHTML = `${chordArray[0][1][0]}7`
                } else {
                    chordEl.innerHTML = `${chordArray[0][1][0]}`
                }
            } else {
                if (chordArray[0].length === 5) {
                    chordEl.innerHTML = `${chordArray[0][1][0]}m7`
                } else {
                    chordEl.innerHTML = `${chordArray[0][1][0]}m`
                }
            }
            chordsScroller.appendChild(chordEl)
        }
    }
    

    
    queueDrums() {
        let drumsHash = this.drums.setUpDrumsHash()
        if (drumsHash['kick'].length + this.songHash['kick'].length > 48) {
            alert("You cannot have more than 12 measures")
        } else {
            this.songHash['kick'] = this.songHash['kick'].concat(drumsHash['kick'])
            this.songHash['snare'] = this.songHash['snare'].concat(drumsHash['snare'])
            this.songHash['hihat'] = this.songHash['hihat'].concat(drumsHash['hihat'])
            
            let drumsScroller = document.querySelector('.drums-scroller-region')
            let drumEl = document.createElement('div')
            drumEl.setAttribute('class', `display-drums`)
            drumEl.style.width = `${drumsHash['hihat'].length*20}` + 'px'
            drumEl.setAttribute('duration', `${drumsHash['hihat'].length}`) 
            drumsScroller.appendChild(drumEl)
        }
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
