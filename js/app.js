import React from 'react'

// import Player from './components/player.jsx'
// import Library from './components/library.jsx'
import Mixing from './components/mixing.jsx'
// import Compose from './components/compose.jsx'

// import AppStore from './stores/Appstore.js'

// const datastore = new AppStore()

// datastore.init()
//   .then(states => {
//     React.render(<Player samples={states.samples} playing={states.playing} />, document.getElementById('player'))
//     React.render(<Library library={states.library} user={states.userID} />, document.getElementById('library'))
//     React.render(<Mixing samples={states.samples} />, document.getElementById('mixing'))
//     React.render(<Compose playing={states.playing} user={states.userID}/>, document.getElementById('compose'))
//   })

React.render(<Mixing />, document.getElementById('mixing'))
