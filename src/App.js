import React from 'react';
import ReactDOM from 'react-dom';
import './Styling.css'
import Channel from './components/Channel';

class App extends React.Component {

  constructor() {
    super();
    this.channelIndexes = [...Array(9).keys()];
    this.state = {
      play: false,
      loop: false
    }
  }

  playAll = () => {
		this.setState(() => ({
			play: true
		}))
	}

  stopAll = () => {
		this.setState(() => ({
			play: false
		}))
	}

  loopAll = () => {
    if(this.state.loop) {
      this.setState(() => ({
        loop: false
      }))
    } else {
      this.setState(() => ({
        loop: true
      }))
    }
		
	}

  render() {
    return (
      <div id='main-wrapper'>

        <div id='buttons-wrapper'>

          <button
            onClick={this.playAll}
            play={this.state.play}
            className='button playBtn'
          />

          <button 
            onClick={this.stopAll}
            play={this.state.play}
            className='button stopBtn'
          />

          <button 
            onClick={this.loopAll}
            loop={this.state.play}
            className='button loopBtn'
            />

        </div>

        <div id='channels-wrapper'>
          {this.channelIndexes.map(index => (
              <Channel
                key={index}
                value={index}
                playStatus={this.state.play}
                loopStatus={this.state.loop}
              />
          ))}

        </div>

      </div>
    );
  }
}

export default App;