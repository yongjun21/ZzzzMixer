import React from 'react'
import classNames from 'classnames'
import {sampleFileNames} from '../constants/AppConstants'
import Howler from 'howler'

const soundLibrary = Array(10).fill(null)
let lastPlayingState = false

export default class Player extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      playing: false,
      timer: 0,
      countdown: 0
    }
    this.togglePlay = this.togglePlay.bind(this)
    this.startCountdown = this.startCountdown.bind(this)
  }

  togglePlay () {
    this.setState({playing: !this.state.playing})
  }

  startCountdown () {
    if (this.state.timer) window.clearInterval(this.state.timer)
    function intervalCallback () {
      if (!this.state.playing) return
      if (this.state.countdown > 0) {
        this.setState({countdown: this.state.countdown - 1})
      } else {
        window.clearInterval(this.state.timer)
        this.setState({
          playing: false,
          timer: 0,
          countdown: 0
        })
      }
    }
    this.setState({
      timer: window.setInterval(intervalCallback.bind(this), 1000),
      countdown: 10
    })
  }

  render () {
    this.props.layers.forEach((layer, idx) => {
      if (layer > 0) {
        if (soundLibrary[idx]) {
          soundLibrary[idx].volume(0.2 * layer)
          if (this.state.playing && !lastPlayingState) soundLibrary[idx].play()
          else if (!this.state.playing && lastPlayingState) soundLibrary[idx].pause()
        } else {
          soundLibrary[idx] = new Howler.Howl({
            urls: ['../../assets/audio/' + sampleFileNames[idx] + '.mp4'],
            loop: true,
            volume: 0.2 * layer
          })
          if (this.state.playing) soundLibrary[idx].play()
        }
      } else {
        if (soundLibrary[idx]) {
          soundLibrary[idx].unload()
          soundLibrary[idx] = null
        }
      }
    })

    lastPlayingState = this.state.playing

    const playButtonProps = {
      className: classNames('fa', {
        'fa-play': !this.state.playing,
        'fa-pause': this.state.playing
      }),
      onClick: this.togglePlay
    }

    const timerProps = {
      className: 'countdown-timer',
      onClick: this.startCountdown
    }

    const timerDisplay = Math.floor(this.state.countdown / 60) + ':' +
      (this.state.countdown % 60 < 10 ? '0' : '') + this.state.countdown % 60

    return (
      <div>
        <h3>{this.props.title || 'Untitled'}</h3>
        <button {...playButtonProps} />
        <button {...timerProps} >{timerDisplay}</button>
      </div>
    )
  }

}
