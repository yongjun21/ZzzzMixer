/* globals Audio */

import React from 'react'


import classNames from 'classnames'

import './mixing.styl'

export default class Mixing extends React.Component {
  static propTypes = {
    layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      sampleNames: sampleNames
    }
  }

  render () {
    return (
      <section className='Mixing-section'>
        {this.state.samplenames.map((name, idx) => {
          return <Bubble label={name} key={idx}/>
        })
        }
      </section>
    )
  }
}

class Bubble extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      selected: false,
      bubbleSize: 1
    }
  }

  handleClick (e) {
    // To implement trackNum, volume
//  tracksChosen = this.props.tracks.map((track, idx) => {
//    return <TrackBubble key={idx} trackNum={track.trackNum} volume={track.volume} size={1} />
//  })
    if (!this.state.selected) {
      this.setState({selected: true})
      this.playSound('open')
    } else if (this.state.bubbleSize === 3) {
      // Set bubbleSize to 0 then 1 to create a realistic shrinking effect on close
      this.setState({
        selected: false,
        bubbleSize: 0
      })
      this.playSound('close')
      setTimeout(() => { this.setState({bubbleSize: 1}) }, 200)
    } else {
      this.setState({bubbleSize: this.state.bubbleSize + 1})
      this.playSound('volume')
    }
  }

  playSound (type) {
    const isSafari = (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1)
    if (!isSafari) {
      let audio
      if (type === 'open') {
        audio = new Audio('./ui-sounds/open-bubble.mp3')
      } else if (type === 'volume') {
        audio = new Audio('./ui-sounds/single-bubble.mp3')
      } else if (type === 'close') {
        audio = new Audio('./ui-sounds/close-bubble.mp3')
      }
      audio.play()
    }
  }

  render () {
    const self = this

    // let bubbleSize = this.state.bubbleSize

    const bubbleClass = classNames({
      'Mixing-bubble': true,
      'Mixing-bubble-selected': self.state.selected,
      // ['Mixing-bubble-${bubbleSize}']: this.state.selected && (this.state.bubbleSize > 1)
      'Mixing-bubble-0': !this.state.selected && (this.state.bubbleSize === 0),
      'Mixing-bubble-2': this.state.selected && (this.state.bubbleSize === 2),
      'Mixing-bubble-3': this.state.selected && (this.state.bubbleSize === 3),
      'Mixing-bubble-cafe': this.props.label === 'cafe',
      'Mixing-bubble-fire': this.props.label === 'fire',
      'Mixing-bubble-jungle': this.props.label === 'jungle',
      'Mixing-bubble-rain': this.props.label === 'rain',
      'Mixing-bubble-river': this.props.label === 'river',
      'Mixing-bubble-seawaves': this.props.label === 'seawaves',
      'Mixing-bubble-wind': this.props.label === 'wind'
    })

    const bubbleProps = {

    }

    return (
      <div {...bubbleProps} className={bubbleClass} onClick={this.handleClick.bind(this)}>
        <label>{ self.props.label }</label>
      </div>
    )
  }
}
