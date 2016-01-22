import React from 'react'
import {Link} from 'react-router'
import Player from '../player'
console.log(typeof Player)

export default class Main extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
    history: React.PropTypes.object
  };

  constructor (props) {
    super(props)
    this.state = {
      userID: 'Jared Tong',
      title: '',
      tags: [],
      playing: true,
      layers: Array(10).fill(0),
      collection: []
    }
    this.togglePlay = this.togglePlay.bind(this)
    this.volumeUp = this.volumeUp.bind(this)
    this.loadTrack = this.loadTrack.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  togglePlay () {
    this.setState({playing: !this.state.playing})
  }

  volumeUp (event) {
    const selectedSampleID = +event.target.value
    if (this.state.layers[selectedSampleID] === 3) {
      this.state.layers[selectedSampleID] = 0
    } else {
      this.state.layers[selectedSampleID]++
    }
    this.forceUpdate()
  }

  loadTrack (event) {
    const selectedTrackID = +event.target.value
    const selectedTrack = this.state.collection.find(track => {
      return track.trackID === selectedTrackID
    })
    selectedTrack.timesPlayed++
    this.setState({
      title: selectedTrack.title,
      tags: selectedTrack.tags,
      playing: true,
      layers: Array.from(selectedTrack.layers)
    })
  }

  uploadHandler (data) {
    let maxID = -1
    this.state.collection.forEach(track => maxID = Math.max(maxID, track.trackID))
    const newTrack = {
      trackID: maxID + 1,
      composedBy: this.state.userID,
      title: data.title,
      tags: data.tags,
      layers: Array.from(this.state.layers),
      timesPlayed: 0
    }

    this.state.collection.push(newTrack)
    this.setState({
      title: data.title,
      tags: data.tags
    })
    this.props.history.pushState(null, '/compose')
  }

  render () {
    const childrenProps = Object.assign(this.state, {
      volumeUp: this.volumeUp,
      loadTrack: this.loadTrack,
      uploadHandler: this.uploadHandler
    })

    return (
      <main>
        <header>
          <Link to='/library'>Library</Link>
          <Link to='/compose'>Compose</Link>
        </header>
        {React.cloneElement(this.props.children, childrenProps)}
        <Player
          title={this.state.title}
          playing={this.state.playing}
          layers={this.state.layers}
          togglePlay={this.togglePlay} />
      </main>
    )
  }
}
