import * as Tone from 'tone' 
console.log('kick working!') 
import { Player } from 'tone';


class DrumsSetup {
    constructor () {
    this.addMeasure = this.addMeasure.bind(this)
    this.addFirstMeasure = this.addFirstMeasure.bind(this)
    this.tiggerKick = document.querySelector('.add-measure')
    this.tiggerKick.addEventListener("click", this.addMeasure)
    this.tiggerKick = document.querySelector('.remove-measure')
    this.tiggerKick.addEventListener("click", this.removeMeasure)
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
            kickCheckbox.id = "4th-kick";
            kickCheckbox.value = `${this.measure}-${i}`
            kickMeasure.appendChild(kickCheckbox)

            const snareCheckbox = document.createElement("input");
            snareCheckbox.type = "checkbox";
            snareCheckbox.id = "4th-snare";
            snareCheckbox.value = `${this.measure}-${i}`
            snareMeasure.appendChild(snareCheckbox)

            const hihatCheckbox = document.createElement("input");
            hihatCheckbox.type = "checkbox";
            hihatCheckbox.id = "4th-hihat";
            hihatCheckbox.value = `${this.measure}-${i}`
            hihatMeasure.appendChild(hihatCheckbox)
        }
    }


    addMeasure() {
        console.log('kick measure added')
        const kickMeasure= document.querySelector('.kick-measures')
        const snareMeasure= document.querySelector('.snare-measures')
        const hihatMeasure= document.querySelector('.hihat-measures')
        this.measure++

        for(let i = 1; i < 5; i++) {
            const kickCheckbox = document.createElement("input");
            kickCheckbox.type = "checkbox";
            kickCheckbox.id = "4th-kick";
            kickCheckbox.value = `${this.measure}-${i}`
            kickMeasure.appendChild(kickCheckbox)

            const snareCheckbox = document.createElement("input");
            snareCheckbox.type = "checkbox";
            snareCheckbox.id = "4th-snare";
            snareCheckbox.value = `${this.measure}-${i}`
            snareMeasure.appendChild(snareCheckbox)

            const hihatCheckbox = document.createElement("input");
            hihatCheckbox.type = "checkbox";
            hihatCheckbox.id = "4th-hihat";
            hihatCheckbox.value = `${this.measure}-${i}`
            hihatMeasure.appendChild(hihatCheckbox)
        }
    }
}

export default DrumsSetup