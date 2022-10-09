import * as Tone from 'tone' 
console.log('kick working!') 
import { Player } from 'tone';

class Kick {
    constructor () {
    this.addMeasure = this.addMeasure.bind(this)
    this.setUpKickArray = this.setUpKickArray.bind(this)
    this.tiggerKick = document.querySelector('.add-measure')
    this.tiggerKick.addEventListener("click", this.addMeasure)
    this.measure = 0
    this.kickArray = []
    }

    addMeasure() {
        console.log('kick measure added')
        const drumMeasure= document.querySelector('.kick-measures')
        this.measure++
        for(let i = 1; i < 5; i++) {
            const kickCheckbox = document.createElement("input"); // <p></p>
            kickCheckbox.type = "checkbox";
            kickCheckbox.id = "4th-kick";
            kickCheckbox.value = `${this.measure}-${i}`
            drumMeasure.appendChild(kickCheckbox)
        }
        const kickBreak = document.createElement("br"); // <p></p> 
        drumMeasure.appendChild(kickBreak);
    }

    setUpKickArray() {
        const kicks = document.querySelectorAll("div.kick-measures > input")
        kicks.forEach (kick =>{
            if (kick.checked === true){ 
                this.kickArray.push('hit')
            } else { 
                this.kickArray.push('rest')
            } 
        })
        return this.kickArray 
    }
}

export default Kick