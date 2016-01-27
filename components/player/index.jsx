import React from 'react'
import classNames from 'classnames'
import {Howl} from 'howler'
import {loadAudio} from '../helpers-db'
import './style.css'

const audioSet = Array(10).fill(null)
const sampleURLs = Array(10).fill(null)
let lastPlayingState = false

export default class Player extends React.Component {
  static propTypes = {
    selectedTrack: React.PropTypes.object,
    playing: React.PropTypes.bool.isRequired,
    layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    togglePlay: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      timer: 0,
      countdown: 0
    }
    this.startCountdown = this.startCountdown.bind(this)
  }

  startCountdown () {
    if (this.state.timer) window.clearInterval(this.state.timer)
    function intervalCallback () {
      if (!this.props.playing) return
      if (this.state.countdown > 0) {
        this.setState({countdown: this.state.countdown - 1})
      } else {
        window.clearInterval(this.state.timer)
        this.props.togglePlay()
        this.setState({
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
        if (audioSet[idx]) {
          audioSet[idx].volume(0.2 * layer)
          if (this.props.playing && !lastPlayingState) audioSet[idx].play()
          else if (!this.props.playing && lastPlayingState) audioSet[idx].pause()
        } else {
          if (!sampleURLs[idx]) loadAudio(sampleURLs, idx)
          audioSet[idx] = new Howl({
            urls: [sampleURLs[idx]],
            format: 'mp4',
            buffer: true,
            loop: true,
            volume: 0.3 * layer
          })
          if (this.props.playing) audioSet[idx].play()
        }
      } else {
        if (audioSet[idx]) {
          audioSet[idx].unload()
          audioSet[idx] = null
        }
      }
    })

    lastPlayingState = this.props.playing

    let title = 'Untitled'
    let composer = ''

    if (this.props.selectedTrack) {
      title = this.props.selectedTrack.title
      if (this.props.selectedTrack.composedBy) {
        composer = 'By: ' + this.props.selectedTrack.composedBy.nickname
      }
    }

    const playButtonProps = {
      id: 'play-button',
      className: classNames('fa', {
        'fa-play': !this.props.playing,
        'fa-pause': this.props.playing
      }),
      onClick: this.props.togglePlay
    }

    const timerProps = {
      className: 'countdown-timer',
      onClick: this.startCountdown
    }

    const timerDisplay = Math.floor(this.state.countdown / 60) + ':' +
      (this.state.countdown % 60 < 10 ? '0' : '') + this.state.countdown % 60

    return (
      <footer id='player'>
        <span className='title'>{title}</span>
        <span className='composer'>{composer}</span>
        <a {...playButtonProps} />
        <a {...timerProps} >{timerDisplay}</a>
      </footer>
    )
  }
}
