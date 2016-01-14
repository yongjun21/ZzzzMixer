import React from 'react'

export default class SoundBubble extends React.Component {
  static propTypes = {
    layerID: React.PropTypes.number.isRequired,
    volume: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired
  };

  render () {
    return (
      <li>
        <h6>Track {this.props.layerID}</h6>
        <h6>Volume: {this.props.volume}</h6>
      </li>
    )
  }
}
