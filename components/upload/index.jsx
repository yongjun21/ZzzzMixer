import React from 'react'
import SoundBubble from '../bubble'
import {tagNames, defaultBubbleStyle} from '../helpers'
import './style.css'

const tagState = {}

export default class Upload extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    selectedTrack: React.PropTypes.object,
    layers: React.PropTypes.arrayOf(React.PropTypes.number),
    uploadHandler: React.PropTypes.func,
    history: React.PropTypes.object
  };

  constructor (props) {
    super(props)

    if (this.props.selectedTrack) {
      tagNames.forEach(tag => {
        tagState[tag] = this.props.selectedTrack.tags.indexOf(tag) > -1
      })
    } else {
      tagNames.forEach(tag => tagState[tag] = false)
    }

    this.state = {
      title: this.props.selectedTrack ? this.props.selectedTrack.title : '',
      tagState: tagState
    }

    this.changeTitle = this.changeTitle.bind(this)
    this.toggleTag = this.toggleTag.bind(this)
    this.uploadData = this.uploadData.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  changeTitle (event) {
    this.setState({title: event.target.value})
  }

  toggleTag (event) {
    this.state.tagState[event.target.value] = event.target.checked
    this.forceUpdate()
  }

  uploadData () {
    const newData = {
      title: this.state.title || 'Untitled',
      tags: tagNames.filter(tag => this.state.tagState[tag])
    }
    if (!newData.tags.length) newData.tags.push('No tag')
    this.props.uploadHandler(newData)
  }

  goBack () {
    this.props.history.goBack()
  }

  render () {
    const layersChosen = this.props.layers
    .map((volume, idx) => {
      return {
        key: idx,
        sampleID: volume > 0 ? idx : -1,
        style: Object.assign({
          color: 'white',
          boxShadow: '0 0 ' + volume * 0.25 + 'em ' + volume * 0.15 + 'em white'
        }, defaultBubbleStyle),
        active: false
      }
    })
    .filter(props => props.sampleID > -1)
    .map(props => <SoundBubble {...props} />)

    const tagList = []
    tagNames.map((tag, idx) => {
      const checkboxProps = {
        type: 'checkbox',
        value: tag,
        checked: this.state.tagState[tag],
        onChange: this.toggleTag
      }
      tagList.push(<span key={idx} className='tag'><input {...checkboxProps} />{tag}</span>)
    })

    return (
      <section id='upload'>
        <div className='bubbles-ctn'>{layersChosen}</div>
        <form>
          <label>Title:</label>
          <input
            type='text'
            value={this.state.title}
            placeholder='Give this song a name'
            maxLength={40}
            onChange={this.changeTitle} />
          <label>Composed by:</label>
          <input
            type='text'
            value={this.props.user ? this.props.user.nickname : 'Anon'}
            readOnly={true} />
          <label>Select tags:</label>
          <div className='tags-ctn'>{tagList}</div>
        </form>
        <div className='nav-ctn'>
          <button onClick={this.goBack} >
            <span className='fa fa-hand-o-left' />
            Go back
          </button>
          <button onClick={this.uploadData} >
            Add to library
            <span className='fa fa-hand-o-right' />
          </button>
        </div>
      </section>
    )
  }
}
