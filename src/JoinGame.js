import React, { useState } from 'react';

import './JoinGame.css';

document.body.style.backgroundColor = "pastel";

function JoinGame(props) {    

    const [code, setCode] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/join_game', {
            method: 'POST',
            body: code,
        })
        .then(response => response.text())
        .then((data) => {
            props.changeGameCode(code);
            console.log(data);
            props.setTasks(JSON.parse(data));
            console.log(data);
        });

        console.log("SUBMIT CALLED");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    <input className = "button1 up"
                        type="text" 
                        placeholder = "Game PIN"
                        value = {code}
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
