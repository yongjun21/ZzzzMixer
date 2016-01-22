import React from 'react'
import {Link} from 'react-router'
import SoundBubble from '../bubble'
import {tagNames} from '../helpers'

const tagState = {}

export default class Upload extends React.Component {
  static propTypes = {
    userID: React.PropTypes.string,
    title: React.PropTypes.string,
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
    layers: React.PropTypes.arrayOf(React.PropTypes.number),
    uploadHandler: React.PropTypes.func
  };

  constructor (props) {
    super(props)

    tagNames.forEach(tag => tagState[tag] = this.props.tags.indexOf(tag) > -1)

    this.state = {
      title: this.props.title,
      tagState: tagState
    }

    this.importState = this.importState.bind(this)
    this.changeTitle = this.changeTitle.bind(this)
    this.toggleTag = this.toggleTag.bind(this)
    this.uploadData = this.uploadData.bind(this)
  }

  importState (title, tags) {
    tagNames.forEach(tag => tagState[tag] = tags.indexOf(tag) > -1)
    this.setState({
      title: title,
      tagState: tagState
    })
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
      title: this.state.title,
      tags: tagNames.filter(tag => this.state.tagState[tag])
    }
    if (!newData.tags.length) newData.tags.push('No tag')
    this.props.uploadHandler(newData)
  }

  render () {
    const layersChosen = this.props.layers
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

    const tagList = []
    tagNames.map((tag, idx) => {
      const checkboxProps = {
        type: 'checkbox',
        value: tag,
        checked: this.state.tagState[tag],
        onClick: this.toggleTag
      }
      tagList.push(<label key={idx} >{tag}<input {...checkboxProps} /></label>)
    })

    return (
      <section>
        <h2>Great work!</h2>
        <h3>Here's your track</h3>
        <div>{layersChosen}</div>
        <h3>One more step</h3>
        <label>Title:
          <input
            type='text'
            value={this.state.title}
            placeholder='Give me a name'
            maxLength={40}
            required={true}
            onChange={this.changeTitle} />
        </label>
        <label>Composed by:
          <input
            type='text'
            value={this.props.userID}
            readOnly={true} />
        </label>
        <label>Select tags:{tagList}</label>
        <Link to='/compose'>Back</Link>
        <button onClick={this.uploadData} >Add to library</button>
      </section>
    )
  }
}
