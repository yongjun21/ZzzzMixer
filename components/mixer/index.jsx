import React from 'react'
import {Link} from 'react-router'
import SoundBubble from '../bubble'
import {shuffledArr, sampleNames, bubbleSizes} from '../helpers'
import intersection from 'lodash.intersection'

let basket = sampleNames.map((val, idx) => idx)
let reserved = basket.splice(bubbleSizes.length)

export default class Mixer extends React.Component {
  static propTypes = {
    layers: React.PropTypes.arrayOf(React.PropTypes.number),
    volumeUp: React.PropTypes.func
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
        key: idx,
        sampleID: sampleID,
        volume: this.props.layers[sampleID],
        size: bubbleSizes[idx],
        active: true,
        volumeUp: this.props.volumeUp
      }
      return <SoundBubble {...bubbleProps}/>
    })

    return (
      <section>
        <h3>Be creative</h3>
        <div>{renderBasket}</div>
        <button onClick={this.randomize}>Shuffle</button>
        <Link to='/upload'>Upload</Link>
      </section>
    )
  }
}
