import React from 'react'
import {Link} from 'react-router'
import SoundBubble from '../bubble'
import {shuffledArr, sampleNames, bubbleSizes, bubbleTransform, bgColors} from '../helpers'
import intersection from 'lodash.intersection'

let basket = sampleNames.map((val, idx) => idx)
let reserved = basket.splice(bubbleSizes.length)

export default class Mixer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    layers: React.PropTypes.arrayOf(React.PropTypes.number),
    volumeUp: React.PropTypes.func,
    unloadTrack: React.PropTypes.func
  };

  constructor (props) {
    super(props)
    this.state = {bg: 0}
    this.shuffleBasket = this.shuffleBasket.bind(this)
    this.randomize = this.randomize.bind(this)
  }

  shuffleBasket () {
    basket = []
    reserved = []
    this.props.labuttonyers.forEach((layer, idx) => {
      if (layer > 0) basket.push(idx)
      else reserved.push(idx)
    })
    reserved = shuffledArr(reserved)
    basket = basket.concat(reserved.splice(sampleNames.length - bubbleSizes.length))
    basket = shuffledArr(basket)
  }

  randomize () {
    this.shuffleBasket()
    this.setState({bg: (this.state.bg + 1) % 5})
  }

  render () {
    const selectedLayer = []
    this.props.layers.forEach((layer, idx) => {
      if (layer > 0) selectedLayer.push(idx)
    })
    if (intersection(selectedLayer,
      reserved).length > 0) this.shuffleBasket()
    const renderBasket = basket.map((sampleID, idx) => {
      const bubbleProps = {
        key: idx,
        sampleID: sampleID,
        style: Object.assign(bubbleTransform[idx], {
          color: bgColors[this.state.bg],
          boxShadow: '0 0 ' + this.props.layers[sampleID] * 10 + 'px ' +
            this.props.layers[sampleID] * 5 + 'px white'
        }),
        volume: this.props.layers[sampleID],
        size: bubbleSizes[idx],
        color: bgColors[this.state.bg],
        active: true,
        volumeUp: this.props.volumeUp
      }
      return <SoundBubble {...bubbleProps}/>
    })

    return (
      <section id='mixer' style={{backgroundColor: bgColors[this.state.bg]}}>
        <div>{renderBasket}</div>
        <button onClick={this.randomize}>Shuffle</button>
        <button onClick={this.props.unloadTrack}>Reset</button>
        <Link to='/upload'>Upload</Link>
      </section>
    )
  }
}
