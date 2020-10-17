import React, { useState } from 'react';

import './Home.css';

import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

function Home() {
  const [isCreatingGame, showCreatingGame] = useState(false);
  const [isJoiningGame, showJoiningGame] = useState(false);
    
  return (
    <div className="container">
        <h1 id = "para">IRL Among Us</h1>
        {
            !isCreatingGame && !isJoiningGame &&
       <button className="split left button"
            onClick={(event) => {
                showCreatingGame(true);
                showJoiningGame(false);
            }}
        > 
            Create Game
            </button>
        }
        {
            !isCreatingGame && !isJoiningGame &&
       <button className="split right button"
            onClick={(event) => {
                showCreatingGame(false);
                showJoiningGame(true);
            }}
        >Join Game
        </button>
        }
        {isCreatingGame && <CreateGame />}
        {isJoiningGame && <JoinGame />}
    </div>
  );
}

export default Home;
