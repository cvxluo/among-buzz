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
            <button className="howtoplay"
            onClick={(event) => {
                alert("How To Play:\n1) Create a Game and select task locations in your nearby area.\n2) Submit to the server and copy down the game code!\n3) Use the code to join with your friends!\n4) Buzzmates must go to task locations to complete tasks, and impostors must be in range of crewmates to assassinate them!\n5) The game ends either if all tasks are completed or the impostors kill all but 2 people!\nHave fun!");
            }}>
                How To Play
            </button>
        {isCreatingGame && <CreateGame />}
        {isJoiningGame && <JoinGame 
        changeGameCode={props.changeGameCode}
        setTasks={props.setTasks}
        />}
    </div>
  );
}

export default Home;
