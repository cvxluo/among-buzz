import React, { useState } from 'react';
import './App.css';

import Home from './Home';
import Game from './Game';

function App() {

  const [gameCode, setGameCode] = useState('');

  return (
    <div className="App">
      {
        (gameCode) ?
        <Game 
        gameCode={gameCode}
        />
        :
        <Home
        changeGameCode={setGameCode}
        />}
    </div>
  );
}

export default App;
