import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import NavBar from '../navbar'
import Player from '../player'
import {addToDB, updateDB, deleteFromDB, fetchDB} from '../helpers-db'
import {loginUser, logoutUser, getUserProfile} from '../helpers-auth'
import './style.css'

export default class Main extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
    history: React.PropTypes.object
  };

  constructor (props) {
    super(props)
    this.state = {
      playing: true,
      layers: Array(10).fill(0)
    }
    this.togglePlay = this.togglePlay.bind(this)
    this.volumeUp = this.volumeUp.bind(this)
    this.loadTrack = this.loadTrack.bind(this)
    this.unloadTrack = this.unloadTrack.bind(this)
    this.deleteTrack = this.deleteTrack.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  componentDidMount () {
    getUserProfile(this.setState.bind(this))
    fetchDB(this.setState.bind(this))
  }

  togglePlay (event) {
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

  loadTrack (trackID) {
    function callback () {
      const selectedTrack = this.state.collection.find(track => {
        return track._id === trackID
      })
      selectedTrack.timesPlayed++
      updateDB(selectedTrack).then(result => {
        selectedTrack._rev = result.rev
        this.setState({
          selectedTrack: selectedTrack,
          playing: true,
          layers: Array.from(selectedTrack.layers)
        })
      })
    }
    return callback.bind(this)
  }

  unloadTrack () {
    this.setState({
      selectedTrack: null,
      layers: Array(10).fill(0)
    })
  }

  deleteTrack (trackID) {
    function callback (event) {
      event.stopPropagation()
      const toRemove = this.state.collection.splice(
        this.state.collection.findIndex(track => {
          return track._id === trackID
        }), 1)[0]
      deleteFromDB(toRemove)
      this.forceUpdate()
    }
    return callback.bind(this)
  }

  uploadHandler (data) {
    const newTrack = {
      title: data.title,
      composedBy: this.state.user,
      tags: data.tags,
      layers: Array.from(this.state.layers),
      timesPlayed: 0
    }

    addToDB(newTrack).then(result => {
      newTrack._id = result.id
      newTrack._rev = result.rev
      this.setState({
        selectedTrack: newTrack,
        collection: this.state.collection.concat(newTrack)
      })

      this.props.history.goBack()
    })
  }

  render () {
    const childrenProps = Object.assign(this.state, {
      key: window.location.pathname,
      volumeUp: this.volumeUp,
      loadTrack: this.loadTrack,
      unloadTrack: this.unloadTrack,
      deleteTrack: this.deleteTrack,
      uploadHandler: this.uploadHandler
    })

    return (
      <main>
        <NavBar
          user={this.state.user}
          loginUser={loginUser}
          logoutUser={logoutUser.bind(this)} />
        <ReactCSSTransitionGroup
          component='section'
          transitionName='page'
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600} >
          {React.cloneElement(this.props.children, childrenProps)}
        </ReactCSSTransitionGroup>
        <Player
          selectedTrack={this.state.selectedTrack}
          playing={this.state.playing}
          layers={this.state.layers}
          togglePlay={this.togglePlay} />
      </main>
    )
  }
}
