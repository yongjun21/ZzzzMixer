import React from 'react'
import SoundBubble from './bubble'
import {sampleNames, bubbleSizes} from '../helpers/constants'
import {shuffledArr} from '../helpers/utils'
import intersection from 'lodash.intersection'

let basket = sampleNames.map((val, idx) => idx)
let reserved = basket.splice(bubbleSizes.length)

export default class MixingRoom extends React.Component {
  static propTypes = {
    layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    volumeUp: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.shuffleBasket = this.shuffleBasket.bind(this)
    this.randomize = this.randomize.bind(this)
  }

  shuffleBasket () {
    basket = []
    reserved = []
    this.props.layers.forEach((layer, idx) => {
      if (layer > 0) basket.push(idx)
      else reserved.push(idx)
    })
    reserved = shuffledArr(reserved)
    basket = basket.concat(reserved.splice(sampleNames.length - bubbleSizes.length))
    basket = shuffledArr(basket)
  }

  randomize () {
    this.shuffleBasket()
    this.forceUpdate()
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
        sampleID: sampleID,
        volume: this.props.layers[sampleID],
        size: bubbleSizes[idx],
        active: true,
        volumeUp: this.props.volumeUp
      }
      return <SoundBubble key={sampleID} {...bubbleProps}/>
    })

    return (
      <div>
        <h3>Be creative</h3>
        <div>{renderBasket}</div>
        <button onClick={this.randomize}>Shuffle</button>
      </div>
    )
  }
}
