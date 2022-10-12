class SetupTime {
    setupTimeEls() {
        let measure = 1
        let quarterNote = 1
        for (let i = 0; i < 48; i++) {
            let timeScroller = document.querySelector('.time-scroller-region')
            let timeElOn = document.createElement('div')
            // timeEl.setAttribute('type', 'checkbox')
            timeElOn.setAttribute('class', 'tick-on')
            timeElOn.setAttribute('beat', `${measure}-${quarterNote}`)
            timeElOn.setAttribute('id', `${i}-tick-on`)
            quarterNote++
            if (quarterNote > 4){
                measure++
                quarterNote = 1  
            }
            timeScroller.appendChild(timeElOn)
            let timeElOff = document.createElement('div')
            // timeEl.setAttribute('type', 'checkbox')
            timeElOff.setAttribute('class', 'tick-off')
            timeElOff.setAttribute('beat', `${measure}-${quarterNote}`)
            timeElOff.setAttribute('id', `${i}-tick-off`)
            quarterNote++
            if (quarterNote > 4){
                measure++
                quarterNote = 1  
            }
            timeScroller.appendChild(timeElOff)
        }
    }
}

export default SetupTime