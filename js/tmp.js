import React from 'react'
import ReactDOM from 'react-dom'
import Player from './components/player'
import Compose from './components/compose'

let tracks = [
  {trackNum: 1, volume: 3},
  {trackNum: 2, volume: 3},
  {trackNum: 3, volume: 3}
]

const playerProps = {
  title: '',
  tracks: tracks,
  samples: [{}]
}

const composeProps = {
  title: '',
  composedBy: 'Anon',
  tracks: tracks,
  tags: [],
  uploadHandler: console.log.bind(console)
}

ReactDOM.render(<Player {...playerProps} />, document.getElementById('player'))
ReactDOM.render(<Compose {...composeProps}/>, document.getElementById('compose'))
