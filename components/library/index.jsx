import React from 'react'
import TrackInfo from './TrackInfo'
import LogIn from '../login'
import {tagNames} from '../helpers'
import sortBy from 'lodash.sortby'

export default class Library extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    collection: React.PropTypes.arrayOf(React.PropTypes.object),
    loadTrack: React.PropTypes.func,
    deleteTrack: React.PropTypes.func,
    loginUser: React.PropTypes.func,
    logoutUser: React.PropTypes.func
  };

  constructor (props) {
    super(props)

    this.state = {
      byMe: false,
      tagFilter: 0
    }

    this.toggleByMe = this.toggleByMe.bind(this)
    this.selectTagFilter = this.selectTagFilter.bind(this)
  }

  toggleByMe (event) {
    this.setState({byMe: event.target.checked})
  }

  selectTagFilter (event) {
    this.setState({tagFilter: event.target.selectedIndex})
  }

  render () {
    const tagsDropdown = ['--None--'].concat(tagNames)
      .map((tag, idx) => <option key={idx} >{tag}</option>)

    let filteredCollection = (this.state.byMe && this.props.user)
      ? this.props.collection.filter(track => track.composedBy &&
        track.composedBy.user_id === this.props.user.user_id)
      : this.props.collection
    if (this.state.tagFilter) {
      filteredCollection = filteredCollection.filter(track => {
        return track.tags.indexOf(tagNames[this.state.tagFilter - 1]) > -1
      })
    }
    filteredCollection = sortBy(filteredCollection, track => -track.timesPlayed)
    filteredCollection = filteredCollection.map((trackInfo, idx) => {
      const allowDelete = !!this.props.user &&
        (!trackInfo.composedBy || this.props.user.user_id === trackInfo.composedBy.user_id)
      return (
        <TrackInfo
          key={idx}
          {...trackInfo}
          allowDelete={allowDelete}
          loadTrack={this.props.loadTrack}
          deleteTrack={this.props.deleteTrack} />
      )
    })

    return (
      <section>
        <LogIn
          user={this.props.user}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser} />
        <h3>Explore & find new tracks</h3>
        <label>
          <input
            type='checkbox'
            checked={this.state.byMe}
            onClick={this.toggleByMe} />
          By me
        </label>
        <label>Filter by tag:
          <select onChange={this.selectTagFilter} >{tagsDropdown}</select>
        </label>
        <ul>{filteredCollection}</ul>
      </section>
    )
  }
}
