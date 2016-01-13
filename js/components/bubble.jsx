import React from 'react'

export default class TrackBubble extends React.Component {
  static propTypes = {
    trackNum: React.PropTypes.number.isRequired,
    volume: React.PropTypes.number.isRequired,
    size: React.PropTypes.number.isRequired
  };

  render () {
    return (
      <div>
        <h6>Track {this.props.trackNum}</h6>
        <h6>Volume: {this.props.volume}</h6>
      </div>
    )
  }
}
