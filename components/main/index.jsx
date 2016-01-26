import React from 'react'
import {IndexLink, Link} from 'react-router'
import Auth0Lock from 'auth0-lock'
import Player from '../player'
import {addToDB, updateDB, deleteFromDB, fetchDB} from '../helpers-db'

const lock = new Auth0Lock('6epBfuNAf2YdSMlMEDRrFdb2nVmeh1xM', 'yongjun21.auth0.com')
const key = 'ZzzzMixer-User'

export default class Main extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
    history: React.PropTypes.object
  };

  constructor (props) {
    super(props)
    this.state = {
      title: '',
      tags: [],
      playing: true,
      layers: Array(10).fill(0)
    }
    this.togglePlay = this.togglePlay.bind(this)
    this.volumeUp = this.volumeUp.bind(this)
    this.loadTrack = this.loadTrack.bind(this)
    this.deleteTrack = this.deleteTrack.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  componentDidMount () {
    let user = JSON.parse(window.localStorage.getItem(key))
    const authHash = lock.parseHash(window.location.hash)
    window.location.hash = ''

    function callback (err, profile) {
      if (err) {
        console.error(err)
        this.setState({user: null})
      } else {
        user = {
          user_id: profile.user_id,
          nickname: profile.nickname
        }
        window.localStorage.setItem(key, JSON.stringify(user))
        this.setState({user: user})
      }
    }

    if (!user && authHash) {
      if (authHash.id_token) {
        lock.getProfile(authHash.id_token, callback.bind(this))
      } else if (authHash.error) {
        console.log('Error signing in', authHash)
        this.setState({user: null})
      }
    } else this.setState({user: user})

    fetchDB(this.setState.bind(this))
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
    const selectedTrack = this.state.collection.find(track => {
      return track._id === event.target.value
    })
    selectedTrack.timesPlayed++
    updateDB(selectedTrack).then(result => {
      selectedTrack._rev = result.rev
      this.setState({
        title: selectedTrack.title,
        tags: selectedTrack.tags,
        playing: true,
        layers: Array.from(selectedTrack.layers)
      })
    })
  }

  deleteTrack (event) {
    const toRemove = this.state.collection.splice(
      this.state.collection.findIndex(track => {
        return track._id === event.target.value
      }), 1)[0]
    deleteFromDB(toRemove)
    this.forceUpdate()
  }

  uploadHandler (data) {
    const newTrack = {
      composedBy: this.state.user,
      title: data.title,
      tags: data.tags,
      layers: Array.from(this.state.layers),
      timesPlayed: 0
    }

    addToDB(newTrack).then(result => {
      newTrack._id = result.id
      newTrack._rev = result.rev
      this.setState({
        title: data.title,
        tags: data.tags,
        collection: this.state.collection.concat(newTrack)
      })

      this.props.history.goBack()
    })
  }

  loginUser () {
    lock.show({
      callbackURL: window.location.href,
      responseType: 'token'
    })
  }

  logoutUser () {
    window.localStorage.removeItem(key)
    window.location.hash = ''
    this.setState({user: null})
  }

  render () {
    const childrenProps = Object.assign(this.state, {
      volumeUp: this.volumeUp,
      loadTrack: this.loadTrack,
      deleteTrack: this.deleteTrack,
      uploadHandler: this.uploadHandler,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser
    })

    return (
      <main>
        <header>
          <IndexLink to='/library'>Library</IndexLink>
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
