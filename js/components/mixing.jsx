import React from 'react'
import SoundBubble from './bubble'
import {sampleNames, bubbleSizes} from '../constants/AppConstants'
import partition from 'lodash.partition'

function shuffledList (size) {
  const original = []
  const shuffled = []
  for (let i = 0; i < size; i++) original.push(i)
  for (let i = size; i > 0; i--) {
    shuffled.push(original.splice(Math.floor(Math.random() * i), 1)[0])
  }
  return shuffled
}

export default class MixingRoom extends React.Component {
  static propTypes = {
    layers: React.PropTypes.arrayOf(React.PropTypes.shape({
      sampleID: React.PropTypes.number.isRequired,
      volume: React.PropTypes.number.isRequired
    })).isRequired,
    volumeUp: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      outer: shuffledList(sampleNames.length),
      inner: shuffledList(bubbleSizes.length)
    }
    this.shuffleBubbles = this.shuffleBubbles.bind(this)
  }

  shuffleBubbles () {
    this.setState({
      outer: shuffledList(sampleNames.length),
      inner: shuffledList(bubbleSizes.length)
    })
  }

  render () {
    let basket = partition(this.state.outer, idx => {
      return this.props.layers.findIndex(layer => layer.sampleID === idx) > -1
    })
    basket[0] = basket[0].map(idx => {
      return this.props.layers.find(layer => layer.sampleID === idx)
    })
    basket[1] = basket[1].map(idx => {
      return {sampleID: idx, volume: 0}
    })
    basket = basket[0].concat(basket[1])
    basket = this.state.inner.map(idx => basket[idx])
    basket = basket.map((sample, idx) => {
      const bubbleProps = Object.assign(sample, {
        key: idx,
        size: bubbleSizes[idx],
        active: true,
        volumeUp: this.props.volumeUp
      })
      return <SoundBubble {...bubbleProps}/>
    })

    return (
      <div>
        <h3>Be creative</h3>
        <div>{basket}</div>
        <button onClick={this.shuffleBubbles}>Shuffle</button>
      </div>
    )
  }
}
