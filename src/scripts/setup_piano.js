import * as Tone from 'tone'

const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const whiteNotesCompKeys = ['S', 'D', 'F', 'G', 'H', 'J', 'K']
const blackNotes = ['Db', 'Eb', 'F#', 'G#', 'Bb']
const blackNotesCompKeys = ['E', 'R', 'Y', 'U', 'I']


class SetupPiano {

    constructor () {
        this.keys = document.querySelectorAll('.key')
        this.instructionsButton = document.querySelector('.button-left')
        this.instructionsButton.addEventListener("mouseover", showInstructions)    
        this.instructionsButton.addEventListener("mouseout", hideInstructions)    
    }

    setupPiano() {
        for(let i = 0; i < 7; i++){
            let whiteNoteDiv = document.querySelector('.white-keys')
            let whiteKey = document.createElement('div')
            whiteKey.setAttribute('class', `key white-key`) 
            whiteKey.id = whiteNotes[i]
            whiteNoteDiv.appendChild(whiteKey)
            whiteKey.innerHTML = whiteNotesCompKeys[i]
        }

        for(let i = 0; i < 5; i++){
            let blackNoteDiv = document.querySelector('.black-keys')
            let blackKey = document.createElement('div')
            blackKey.setAttribute('class', `key black-key`) 
            blackKey.id = blackNotes[i]
            blackNoteDiv.appendChild(blackKey)
            blackKey.innerHTML = blackNotesCompKeys[i]
        }

    }
}

function showInstructions() {
    let instructions = document.querySelector('.instructions-left')
    let instructionsHider = document.querySelector('.instructions-hider')

    instructions.style.display = 'block'
    instructionsHider.style.display = 'none'

}

function hideInstructions() {
    let instructions = document.querySelector('.instructions-left')
    let instructionsHider = document.querySelector('.instructions-hider')

    instructions.style.display = 'none'
    instructionsHider.style.display = 'block'

}

export default SetupPiano