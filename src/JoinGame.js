import React, { useState } from 'react';

import './JoinGame.css';

function JoinGame(props) {    

    const [code, setCode] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("SUBMIT CALLED");
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    <p>Code:</p>
                    <input className = "button1 up"
                        type="text" 
                        placeholder = "Game PIN"
                
                        onChange={(event) => setCode(event.target.value)}
                    />
                </label>
                <button className = "buttons center"
                    onClick={onSubmit}> 
                    Enter
                </button>
            </form>
        </div>

    );
}

export default JoinGame;
