import React from 'react'
import {sampleNames} from '../helpers'
import './style.css'

export default class SoundBubble extends React.Component {
  static propTypes = {
    sampleID: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired,
    volume: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool.isRequired,
    volumeUp: React.PropTypes.func
  };

  render () {
    const buttonProps = {
      className: 'bubble',
      style: {
        color: this.props.color,
        boxShadow: '0 0 ' + this.props.volume * 10 + 'px ' +
          this.props.volume * 5 + 'px white',
        WebkitTransform: 'scale(' + this.props.size + ') rotate(-30deg)',
        transform: 'scale(' + this.props.size + ') rotate(-30deg)'
      },
      // style: this.props.style,
      value: this.props.sampleID,
      disabled: !this.props.active,
      onClick: this.props.volumeUp
    }

    return (
      <button {...buttonProps}>{sampleNames[this.props.sampleID]}</button>
    )
  }
}
