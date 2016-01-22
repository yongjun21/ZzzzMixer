import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main'
import Library from './components/library'
import Compose from './components/compose'
import Mixer from './components/mixer'
import Upload from './components/upload'
import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router'

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='library' component={Main}>
      <IndexRoute component={Library}/>
      <Route path='/compose' component={Compose}>
        <IndexRoute component={Mixer}/>
        <Route path='/upload' component={Upload}/>
      </Route>
    </Route>
    <Redirect from='/' to='library'/>
  </Router>
), document.getElementById('main'))
