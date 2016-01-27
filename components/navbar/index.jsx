import React from 'react'
import {IndexLink, Link} from 'react-router'
import './style.css'

export default class NavBar extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    loginUser: React.PropTypes.func,
    logoutUser: React.PropTypes.func
  };

  render () {
    const displayName = this.props.user
      ? 'Logged in as ' + this.props.user.nickname : ''
    const loginButton = this.props.user
      ? <button onClick={this.props.logoutUser}>Log out</button>
      : <button onClick={this.props.loginUser}>Log in</button>
    return (
      <header id='navbar'>
        <Link to='/compose'>Compose</Link>
        <span>{displayName}</span>
        {loginButton}
        <IndexLink to='/library'>Library</IndexLink>
      </header>
    )
  }
}
