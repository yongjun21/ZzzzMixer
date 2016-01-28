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
      ? 'Hi ' + this.props.user.nickname : ''
    const navLeft = window.location.pathname === '/library'
      ? <Link className='nav-icon fa fa-reply' to='/compose'>Composer</Link> : null
    const navRight = window.location.pathname === '/library'
      ? null : <IndexLink className='nav-icon fa fa-share' to='/library'>Library</IndexLink>
    const loginButton = this.props.user
      ? <a className='fa fa-sign-out' onClick={this.props.logoutUser} >Sign out</a>
      : <a className='fa fa-sign-in' onClick={this.props.loginUser} >Sign in</a>

    return (
      <header id='navbar'>
        {navLeft}
        <span>{displayName}</span>
        {loginButton}
        {navRight}
      </header>
    )
  }
}
