import React from 'react'
import ReactDOM from 'react-dom'
import Player from './components/player'

ReactDOM.render(<Player title={'Untitled'} tracks={[1, 2, 3]} samples={[{}]} />, document.getElementById('player'))
