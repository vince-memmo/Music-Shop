# Music_JS_Project

Background:
Music Shop is a user-friendly simplified version of DAW (e.g. GarageBand) that allows the user to workshop a chord and melody idea (i.e. a section of a chorus or verse) without any instruments on hand. Firstly, the user will have an option to choose a drum/percussion beat from a dropdown to back there song clip. Next the user will be able to loop different chords to form the chord progression (harmony) of the song clip. They will have the option to pick the key of the chord (C, D, B etc.), whether the chord is minor or major, and choose to make the chord dominant or not (add a 7th). Lastly, the user can improvise or home in a piano melody on the keyboard that will play over the drum and guitar loops.

The goal is not to be able to make an entire song, but rather flush out small chord-melody ideas that the user may have at a time that they do not have access to an instrument.

In Music Workshop, users are able to:

1. Loop a drum/percussion beat
2. Loop a chord progression on synthesizer which ustilizes Tone.js
3. Compose a piano melody by selecting notes on their key board
4. Change the tempo of their song clip

![Screen Shot 2022-12-10 at 5 54 37 PM](https://user-images.githubusercontent.com/110570521/206883237-1bf1b929-4e24-46f7-8490-6291d55ea34c.png)

## Technologies and Libraries

The drums samples and sythn chords were created with the Tone.js library. To create a chrod, I started by storing every note in the chromatic scale (C to C) in an array. Using logic based on simple music music theory, I was to produce the desired notes needs to make up the chord based on the user's input.

```
const chordNotes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4','Bb4', 'B4']; 

 let startNote = document.getElementById('chord-key').value + '4'
        const startNoteIdx = chordNotes.indexOf(startNote)
        const root = chordNotes[startNoteIdx]
        const third = chordNotes[(startNoteIdx+4) % 12]
        const minorThird = chordNotes[(startNoteIdx+3) % 12]
        const fifth = chordNotes[(startNoteIdx+7) % 12]
        const seventh = chordNotes[(startNoteIdx+10) % 12]
        let chordArray = []

        for (let i = 0; i < duration-1; i++) {
            chordArray.push('rest')
        }
        
        if (document.getElementById('chord-type-maj').checked && document.getElementById('7th').checked) {
            chordArray.unshift([duration, root, third, fifth, seventh])
        } else if (document.getElementById('chord-type-min').checked && document.getElementById('7th').checked) {
            chordArray.unshift([duration, root, minorThird, fifth, seventh])
        } else if (document.getElementById('chord-type-maj').checked) {
            chordArray.unshift([duration, root, third, fifth])
        } else {
            chordArray.unshift([duration, root, minorThird, fifth])
        }
        return chordArray

```

In order to control the timing of the drum hits and chords, I set up hashes that contained key-value pairs of the drum/note (e.g. snare, kick-drum, C4, E4) and either 'hit' or 'rest'. While the song is playing, each position of the hash is checked for 'rest' or 'hit' to see if that note/drum should be played at that time.

```
    for(let i = 0; i < loopLength; i++) {
        if (this.startMusic.innerHTML === 'Play') return
        Tone.loaded().then(() => {
            if (this.songHash['kick'][i] === 'hit' && this.songHash['kick'][i] !== undefined) kickHit.start()
            if (this.songHash['snare'][i] === 'hit' && this.songHash['snare'][i] !== undefined) snareHit.start()
            if (this.songHash['hihat'][i] === 'hit' && this.songHash['hihat'][i] !== undefined) hihatHit.start()
        });
        await this.sleep(bpm);
    }
```

The timing for the synth chords were a little trickier, because they need to be attacked and released, unlike the drums which only need to be attacked. To accomplish this I used the built in ```synth.triggerAttackRelease``` function in Library.js. I used simple arithmetic to figure out when to release the chord based off of the BPMs selected by the user.

```
    if (this.songHash['chords'][i] !== 'rest' && this.songHash['chords'][i] !== undefined) {
        synth.triggerAttackRelease(this.songHash['chords'][i].slice(1), `${this.songHash['chords'][i][0] * (bpm/1000)}`); //play sound
        chords = this.songHash['chords'][i].slice(1)
    }
```

I combined vanilla javascript, Tone.js, and css to create the piano. I added an event listener on each of the computer keys that corresponds with a piano key.

```
  const piano = new Piano()
    window.addEventListener("keydown", (e) => piano.playNote(e.key));

```

This triggers the attack and release (via Tone.js) of the correct corresponding key.

```
    playNote(key) {
        if (whiteNotesCompKeys.includes(key)) {
            const idx = whiteNotesCompKeys.indexOf(key)
            const noteEl = document.getElementById(whiteNotes[idx].slice(0,1))
            noteEl.style.backgroundColor = 'lightgrey'
            setTimeout(function(){
                noteEl.style.backgroundColor = 'ivory'
            }, 350)
            if (key === whiteNotesCompKeys[0]) piano.triggerAttackRelease([whiteNotes[0]], 0.5)
            if (key === whiteNotesCompKeys[1]) piano.triggerAttackRelease([whiteNotes[1]], 0.5)
            if (key === whiteNotesCompKeys[2]) piano.triggerAttackRelease([whiteNotes[2]], 0.5)
            if (key === whiteNotesCompKeys[3]) piano.triggerAttackRelease([whiteNotes[3]], 0.5)
            if (key === whiteNotesCompKeys[4]) piano.triggerAttackRelease([whiteNotes[4]], 0.5)
            if (key === whiteNotesCompKeys[5]) piano.triggerAttackRelease([whiteNotes[5]], 0.5)
            if (key === whiteNotesCompKeys[6]) piano.triggerAttackRelease([whiteNotes[6]], 0.5)
        }
```

The piano itself was constructed with CSS.

![Screen Shot 2022-12-10 at 6 01 49 PM](https://user-images.githubusercontent.com/110570521/206883229-ff4e58d1-fab6-43f4-80e5-4ee902061ac7.png)
