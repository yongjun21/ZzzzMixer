import React from 'react'
import TrackBubble from './bubble'

export default class Compose extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    composedBy: React.PropTypes.string.isRequired,
    tracks: React.PropTypes.arrayOf(React.PropTypes.shape({
      trackNum: React.PropTypes.number.isRequired,
      volume: React.PropTypes.number.isRequired
    })).isRequired,
    tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    uploadHandler: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    const tagState = {
      'Nature': false,
      'Urban': false,
      'Sea': false,
      'Weather': false,
      'Instrumental': false,
      'Vocal': false,
      'New age': false,
      'White noise': false
    }
    this.props.tags.forEach(tag => tagState[tag] = true)

    this.state = {
      title: this.props.title,
      tagState: tagState
    }

    this.changeTitle = this.changeTitle.bind(this)
    this.toggleTag = this.toggleTag.bind(this)
    this.uploadData = this.uploadData.bind(this)
  }

  changeTitle (event) {
    this.setState({title: event.target.value})
  }

  toggleTag (event) {
    // const tagState = this.state.tagState
    this.state.tagState[event.target.value] = event.target.checked
    this.forceUpdate()
  }

  uploadData (event) {
    const dataPkg = {
      title: this.state.title,
      tags: Object.keys(this.state.tagState).filter(tag => this.state.tagState[tag])
    }
    this.props.uploadHandler(dataPkg)
  }

  render () {
    const titleInputProps = {
      type: 'text',
      value: this.state.title,
      placeholder: 'Give this mix a name',
      maxLength: 40,
      onChange: this.changeTitle
    }

    const composedByProps = {
      type: 'text',
      value: this.props.composedBy,
      readOnly: true
    }

    const submitButtonProps = {
      onClick: this.uploadData
    }

    const tracksChosen = this.props.tracks.map((track, idx) => {
      return <TrackBubble key={idx} trackNum={track.trackNum} volume={track.volume} size={1} />
    })
    const tagList = []
    Object.keys(this.state.tagState).map((tag, idx) => {
      const checkboxProps = {
        type: 'checkbox',
        value: tag,
        checked: this.state.tagState[tag],
        onClick: this.toggleTag
      }
      tagList.push(<label key={idx} >{tag}<input {...checkboxProps} /></label>)
    })

    return (
      <div>
        <h2>Great work!</h2>
        <h3>Here's your remix</h3>
        <div>{tracksChosen}</div>
        <h3>One more step</h3>
        <label>Title:<input {...titleInputProps} /></label>
        <label>Composed by:<input {...composedByProps} /></label>
        <label>Select tags:{tagList}</label>
        <button {...submitButtonProps} >Publish</button>
      </div>
    )
  }
}
