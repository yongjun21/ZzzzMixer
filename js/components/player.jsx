import React from 'react'

export default class Player extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    tracks: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    samples: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      playing: false,
      volume: 5,
      timer: 0,
      countdown: 0
    }
  }

  render () {
    const playButtonProps = {
      className: this.state.playing ? 'highlight fa fa-play' : 'fa fa-play',
      disabled: this.state.playing,
      onClick: this.togglePlay
    }

    const pauseButtonProps = {
      className: this.state.playing ? 'fa fa-play' : 'highlight fa fa-play',
      disabled: !this.state.playing,
      onClick: this.togglePause
    }

    const volumeControlProps = {
      type: 'range',
      className: 'volume-slider',
      min: 1,
      max: 10,
      step: 1,
      value: this.state.volume,
      onChange: this.setVolume()
    }

    const timerProps = {
      className: 'countdown-timer',
      onClick: this.startCountdown
    }

    const timerDisplay = Math.floor(this.state.countdown / 60) + ':' +
      (this.state.countdown % 60 < 10 ? '0' : '') + this.state.countdown % 60

    return (
      <div>
        <h3>{this.props.title}</h3>
        <button {...playButtonProps} />
        <button {...pauseButtonProps} />
        <input {...volumeControlProps} />
        <button {...timerProps} >{timerDisplay}</button>
      </div>
    )
  }

}
