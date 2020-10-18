import React, { useState } from 'react';

import './Home.css';

import CreateGame from './CreateGame';
import JoinGame from './JoinGame';

function Home(props) {
  const [isCreatingGame, showCreatingGame] = useState(false);
  const [isJoiningGame, showJoiningGame] = useState(false);
    
  return (
    <div className="container">
        <h1 id = "para">Among Buzz</h1>
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
        {isJoiningGame && <JoinGame 
        changeGameCode={props.changeGameCode}
        setTasks={props.setTasks}
        />}
    </div>
  );
}

export default Home;
