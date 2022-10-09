import * as Tone from 'tone' 
console.log('kick working!') 
import { Player } from 'tone';

class Drums {
    constructor () {
    this.setUpKickArray = this.setUpKickArray.bind(this)
    this.setUpSnareArray = this.setUpSnareArray.bind(this)
    this.setUpHihatArray = this.setUpHihatArray.bind(this)

    
    this.kickArray = []
    this.snareArray = []
    this.hihatArray = []
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
    
    setUpSnareArray() {
        const snare = document.querySelectorAll("div.snare-measures > input")
        snare.forEach (snare =>{
            if (snare.checked === true){ 
                this.snareArray.push('hit')
            } else { 
                this.snareArray.push('rest')
            } 
        })
        return this.snareArray 
    }
    
    setUpHihatArray() {
        const hihats = document.querySelectorAll("div.hihat-measures > input")
        hihats.forEach (hihat =>{
            if (hihat.checked === true){ 
                this.hihatArray.push('hit')
            } else { 
                this.hihatArray.push('rest')
            } 
        })
        return this.hihatArray 
    }

    setUpDrums() {
        const kickArray = this.setUpKickArray()
        const snareArray = this.setUpSnareArray()
        const hihatArray= this.setUpHihatArray()

        let drumsHash = {
            'kick': kickArray,
            'snare': snareArray,
            'hihat': hihatArray
        }
        return drumsHash
    }
}

export default Drums