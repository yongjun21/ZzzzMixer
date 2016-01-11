import React from 'react';
import Hello from './components/hello.jsx';
import World from './components/world.jsx';

React.render(<Hello/>, document.getElementById('hello'));
React.render(<World/>, document.getElementById('world'));
