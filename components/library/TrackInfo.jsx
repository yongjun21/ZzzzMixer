import React from 'react'
import SoundBubble from '../bubble'

export default class TrackInfo extends React.Component {
  static propTypes = {
    trackID: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    composedBy: React.PropTypes.string.isRequired,
    layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    timesPlayed: React.PropTypes.number.isRequired,
    loadTrack: React.PropTypes.func.isRequired,
    deleteTrack: React.PropTypes.func.isRequired
  };

  render () {
    const layerSet = this.props.layers
      .map((volume, idx) => {
        return {
          sampleID: idx,
          volume: volume,
          size: 1,
          active: false
        }
      })
      .filter(props => props.volume > 0)
      .map(props => {
        return <SoundBubble key={props.sampleID} {...props} />
      })

    const tagSet = this.props.tags.map((tag, idx) => {
      return <span key={idx}>{tag}</span>
    })

    return (
      <li>
        <h3>{this.props.title}</h3>
        <h6>{'Composed by: ' + this.props.composedBy}</h6>
        <div>{layerSet}</div>
        <label>Tags:{tagSet}</label>
        <h3>{this.props.timesPlayed}</h3>
        <button value={this.props.trackID} onClick={this.props.loadTrack} >Listen</button>
        <button value={this.props.trackID} onClick={this.props.deleteTrack} >X</button>
      </li>
    )
  }
}
