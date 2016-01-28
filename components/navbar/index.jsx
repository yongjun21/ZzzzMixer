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
    const title = this.props.user
      ? <span className='title' >{'Hi ' + this.props.user.nickname + ','}</span> : null
    const navIcon = window.location.pathname === '/library'
      ? <Link className='fa fa-reply' to='/compose'>Composer</Link>
      : <IndexLink className='fa fa-share' to='/library'>Library</IndexLink>
    const loginButton = this.props.user
      ? <button className='fa fa-sign-out' onClick={this.props.logoutUser} >Sign out</button>
      : <button className='fa fa-sign-in' onClick={this.props.loginUser} >Sign in</button>

    return (
      <header id='navbar'>
        {title}
        {loginButton}
        {navIcon}
      </header>
    )
  }
}
