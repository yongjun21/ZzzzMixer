import React from 'react'
import SoundBubble from '../bubble'
import {defaultBubbleStyle} from '../helpers'

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
          key: idx,
          sampleID: volume > 0 ? idx : -1,
          style: Object.assign({
            color: this.props.bgColor,
            boxShadow: '0 0 ' + volume * 0.25 + 'em ' + volume * 0.15 + 'em white'
          }, defaultBubbleStyle),
          active: false
        }
      })
      .filter(props => props.sampleID > -1)
      .map(props => <SoundBubble {...props} />)

    const tagSet = this.props.tags.map((tag, idx) => {
      return <span className='track-tag' key={idx}>{tag}</span>
    })

    bubbleSet.push(this.props.listenButton)

    return (
      <li className='track-info' style={{backgroundColor: this.props.bgColor}} >
        <span className='track-title'>{this.props.title}</span>
        <span className='track-composer'>{'By: ' + (this.props.composedBy
          ? this.props.composedBy.nickname : 'Anon')}</span>
        {this.props.deleteButton}
        <span className='fa fa-thumbs-o-up' >{this.props.timesPlayed}</span>
        <div className='track-bubbles'>{bubbleSet}</div>
        <span className='fa fa-tags' >{tagSet}</span>
      </li>
    )
  }
}
