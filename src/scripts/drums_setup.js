import * as Tone from 'tone' 
console.log('kick working!') 
import { Player } from 'tone';

let checkboxIndex = 0

class DrumsSetup {
    constructor () {
    this.addMeasure = this.addMeasure.bind(this)
    this.addFirstMeasure = this.addFirstMeasure.bind(this)
    this.clearDrums = this.clearDrums.bind(this)

    this.addMeasureButton = document.querySelector('.add-measure')
    this.addMeasureButton.addEventListener("click", this.addMeasure)
    this.tiggerKick = document.querySelector('.remove-measure')
    this.tiggerKick.addEventListener("click", this.removeMeasure)
    this.clearDrumsButton = document.querySelector('.clear-drums')
    this.clearDrumsButton.addEventListener("click", this.clearDrums)
    this.measure = 0
    }

    addFirstMeasure() {
        console.log('kick measure added')
        const kickMeasure= document.querySelector('.kick-measures')
        const snareMeasure= document.querySelector('.snare-measures')
        const hihatMeasure= document.querySelector('.hihat-measures')
        this.measure++
        
        for(let i = 1; i < 5; i++) {
            const kickCheckbox = document.createElement("input");
            kickCheckbox.type = "checkbox";
            kickCheckbox.id = `checkbox-${checkboxIndex}`;
            kickCheckbox.value = `${this.measure}-${i}`
            kickCheckbox.setAttribute('class', 'drum-checkbox kick-checkbox')
            kickMeasure.appendChild(kickCheckbox)
            checkboxIndex++

            const snareCheckbox = document.createElement("input");
            snareCheckbox.type = "checkbox";
            snareCheckbox.id = `checkbox-${checkboxIndex}`;
            snareCheckbox.value = `${this.measure}-${i}`
            snareCheckbox.setAttribute('class', 'drum-checkbox snare-checkbox')
            snareMeasure.appendChild(snareCheckbox)
            checkboxIndex++

            const hihatCheckbox = document.createElement("input");
            hihatCheckbox.type = "checkbox";
            hihatCheckbox.id = `checkbox-${checkboxIndex}`;
            hihatCheckbox.value = `${this.measure}-${i}`
            hihatCheckbox.setAttribute('class', 'drum-checkbox hihat-checkbox')
            hihatMeasure.appendChild(hihatCheckbox)
            checkboxIndex++
        }
    }


    addMeasure() {
        let checkboxes = document.querySelectorAll('.drum-checkbox')
        if (checkboxes.length === 48) return

        console.log('kick measure added')
        const kickMeasure= document.querySelector('.kick-measures')
        const snareMeasure= document.querySelector('.snare-measures')
        const hihatMeasure= document.querySelector('.hihat-measures')
        this.measure++

        for(let i = 1; i < 5; i++) {
            const kickCheckbox = document.createElement("input");
            kickCheckbox.type = "checkbox";
            kickCheckbox.id = `checkbox-${checkboxIndex}`;
            kickCheckbox.value = `${this.measure}-${i}`
            kickCheckbox.setAttribute('class', 'drum-checkbox kick-checkbox')
            kickMeasure.appendChild(kickCheckbox)
            checkboxIndex++

            const snareCheckbox = document.createElement("input");
            snareCheckbox.type = "checkbox";
            snareCheckbox.id = `checkbox-${checkboxIndex}`;
            snareCheckbox.value = `${this.measure}-${i}`
            snareCheckbox.setAttribute('class', 'drum-checkbox snare-checkbox')
            snareMeasure.appendChild(snareCheckbox)
            checkboxIndex++

            const hihatCheckbox = document.createElement("input");
            hihatCheckbox.type = "checkbox";
            hihatCheckbox.id = `checkbox-${checkboxIndex}`;
            hihatCheckbox.value = `${this.measure}-${i}`
            hihatCheckbox.setAttribute('class', 'drum-checkbox hihat-checkbox')
            hihatMeasure.appendChild(hihatCheckbox)
            checkboxIndex++
        }
    }

    removeMeasure() {
        let checkboxes = document.querySelectorAll('.drum-checkbox')
        if (checkboxes.length === 12) return

        for(let i = checkboxes.length-1; i > checkboxes.length-13; i--) {
            const checkboxEl = document.getElementById(`checkbox-${i}`)
            checkboxEl.remove()
        }
        checkboxIndex -=12
    }

    clearDrums() {
        let checkboxes = document.querySelectorAll('.drum-checkbox')
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false
        }
    }
}

export default DrumsSetup