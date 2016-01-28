import React from 'react'
import {Link} from 'react-router'
import SoundBubble from '../bubble'
import {shuffledArr, sampleNames, bubbleStyles, bgColors} from '../helpers'
import intersection from 'lodash.intersection'
import './style.css'

let basket = sampleNames.map((val, idx) => idx)
let reserved = basket.splice(bubbleStyles.length)

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
    this.props.layers.forEach((layer, idx) => {
      if (layer > 0) basket.push(idx)
      else reserved.push(idx)
    })
    reserved = shuffledArr(reserved)
    basket = basket.concat(reserved.splice(sampleNames.length - bubbleStyles.length))
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
        style: Object.assign({
          color: bgColors[this.state.bg],
          boxShadow: '0 0 ' + this.props.layers[sampleID] * 0.25 + 'em ' +
            this.props.layers[sampleID] * 0.15 + 'em white'
        }, bubbleStyles[idx]),
        active: true,
        volumeUp: this.props.volumeUp
      }
      return <SoundBubble {...bubbleProps}/>
    })

    return (
      <section id='mixer' style={{backgroundColor: bgColors[this.state.bg]}}>
        <div>{renderBasket}</div>
        <button className='fa fa-refresh' onClick={this.randomize} />
        <button className='fa fa-times' onClick={this.props.unloadTrack} />
        <Link className='fa fa-check' to='/upload' />
      </section>
    )
  }
}
