import React, { useState } from 'react';

import { usePosition } from 'use-position';

import './JoinGame.css';

document.body.style.backgroundColor = "pastel";

function JoinGame(props) {    
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = usePosition(true, {enableHighAccuracy: true});

    const { changeGameCode, setTasks } = props;

    const [code, setCode] = useState('');
    const [username, setUsername] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        const playerData = {
            'password': code,
            'lat': latitude,
            'long': longitude,
            'username': username,
        };

        // fetch('http://localhost:5000/join_game', {
        fetch('https://hackgt-20.herokuapp.com/create_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerData),
        })
        .then(response => response.text())
        .then((data) => {
            console.log(data);
            setTasks(JSON.parse(data));
            console.log(data);            
            setTimeout(() => changeGameCode(code), 1000);

        });

        console.log("SUBMIT CALLED");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>

                <label>
                    <input className = "button1 down"
                        type="text" 
                        placeholder = "Username"
                        value = {username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>

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
