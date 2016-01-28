import React from 'react'
import {sampleNames} from '../helpers'
import './style.css'

export default class SoundBubble extends React.Component {
  static propTypes = {
    sampleID: React.PropTypes.number.isRequired,
    style: React.PropTypes.object.isRequired,
    active: React.PropTypes.bool.isRequired,
    volumeUp: React.PropTypes.func
  };

  render () {
    const buttonProps = {
      className: 'bubble',
      style: this.props.style,
      value: this.props.sampleID,
      disabled: !this.props.active,
      onClick: this.props.volumeUp
    }

    return (
      <button {...buttonProps}>{sampleNames[this.props.sampleID]}</button>
    )
  }
}
