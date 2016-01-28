import React from 'react'
import SoundBubble from '../bubble'

export default class TrackInfo extends React.Component {
  static propTypes = {
    _id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    composedBy: React.PropTypes.object,
    layers: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    timesPlayed: React.PropTypes.number.isRequired,
    listenButton: React.PropTypes.element.isRequired,
    deleteButton: React.PropTypes.element,
    bgColor: React.PropTypes.string.isRequired
  };

  render () {
    const bubbleSet = this.props.layers
      .map((volume, idx) => {
        return {
          sampleID: idx,
          volume: volume,
          size: 1,
          color: this.props.bgColor,
          active: false
        }
      })
      .filter(props => props.volume > 0)
      .map(props => {
        return <SoundBubble key={props.sampleID} {...props} />
      })

    const tagSet = this.props.tags.map((tag, idx) => {
      return <span className='tag' key={idx}>{tag}</span>
    })

    return (
      <li style={{backgroundColor: this.props.bgColor}} >
        <span className='track-title'>{this.props.title}</span>
        <span className='trach-composer'>{'Composed by: ' + (this.props.composedBy
          ? this.props.composedBy.nickname : 'Anon')}</span>
        <div className='bubble-ctn'>{bubbleSet}</div>
        <span className='fa fa-tags' >{tagSet}</span>
        <span>{this.props.timesPlayed}</span>
        {this.props.listenButton}
        {this.props.deleteButton}
      </li>
    )
  }
}
