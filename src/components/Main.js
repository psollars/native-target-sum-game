import React, { Component } from 'react';
import Game from './Game';

export default class Main extends Component {
  render() {
    return (
      <Game guessButtonCount={6} initialCounter={10}/>
    );
  }
}
