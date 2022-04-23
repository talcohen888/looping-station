import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import '../Styling.css'

// importing sounds
import Tamborine from '../loopFiles/_tambourine_shake_higher.mp3'
import AllTrack from '../loopFiles/ALL TRACK.mp3'
import Bvoc from '../loopFiles/B VOC.mp3'
import Drums from '../loopFiles/DRUMS.mp3'
import HeVoc from '../loopFiles/HE HE VOC.mp3'
import HighVoc from '../loopFiles/HIGH VOC.mp3'
import Jibrish from '../loopFiles/JIBRISH.mp3'
import Lead from '../loopFiles/LEAD 1.mp3'
import UuhoVoc from '../loopFiles/UUHO VOC.mp3'

class Channels extends Component {

    constructor(props) {
        super(props);

        this.sounds = [Tamborine, AllTrack, Bvoc, Drums, HeVoc, HighVoc, Jibrish, Lead, UuhoVoc];
        this.audio = new Audio();
        this.audioRef = createRef();
        this.audio.ref = this.audioRef;

        this.progressBarRef = createRef();
        this.animationRef = createRef();

        this.state = {
            muted: false,
            play: true,
            loop: false,
            currentTime: 0
        }
    }

    attachSound = (index) => {
        this.audio = new Audio(this.sounds[index]);
    }

    muteSound = () => {
        if (this.audio.muted) {
            this.audio.muted = false;
        } else {
            this.audio.muted = true;
        }
    }

    componentDidMount = () => {
        const index = this.props.value
        {this.attachSound(index)}
    }

    componentDidUpdate = () => {
        // handle play/stop operations
        if(this.props.playStatus) {
            this.playSound();
        } else {
            this.stopSound();
        }

        // handle loop operations
        if(this.props.loopStatus) {
            this.state.loop = true;
            this.audio.loop = true;
        } else {
            this.state.loop = false;
            this.audio.loop = false;
        }
    }

    playSound = () => {
        this.audio.play();
        this.animationRef = requestAnimationFrame(this.moveBar);
    }

    stopSound = () => {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.progressBarRef.current.value = 0;
        cancelAnimationFrame(this.animationRef);
    }

    // advancing channel bar when music is playing
    moveBar = () => {
        this.progressBarRef.current.value = this.audio.currentTime;
        this.animationRef = requestAnimationFrame(this.moveBar);
    }

    render() {
        return (   
            <React.Fragment>
                <input
                    type='range'
                    defaultValue="0"
                    max={this.audio.duration}
                    ref={this.progressBarRef}
                    />
                <button
                    onClick={this.muteSound}
                    className='button muteBtn'
                    />
                <br/>
            </React.Fragment>
        );
    }    
}

export default Channels;