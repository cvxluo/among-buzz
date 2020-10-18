import React, { useState } from 'react';
import './App.css';

import Home from './Home';
import Game from './Game';

function App() {

  const [gameCode, setGameCode] = useState('');
  const [gameData, setGameData] = useState({});

  return (
    <div className="App">
      {
        (gameCode) ?
        <Game 
        gameCode={gameCode}
        data={gameData}
        />
        :
        <Home
        changeGameCode={setGameCode}
        setTasks={setGameData}
        />}
    </div>
  );
}

export default App;
