import React, { useState } from 'react';

import Map from './Map';

import './CreateGame.css';

function CreateGame(props) {    

    const [markers, setMarkers] = useState([]);

    const [recievedCode, setRecievedCode] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
        const taskList = markers.map(
            (marker) => {
                return {
                    'lat': marker.lat(),
                    'long': marker.lng(),
                }
            }
        );
        const markersJSON = {
            'tasks': taskList,
        }
        console.log(markersJSON);
        // fetch('https://hackgt-20.herokuapp.com/create_game', {
        fetch('http://localhost:5000/create_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(markersJSON),
        })
        .then(response => response.text())
        .then((data) => {
            console.log(data);
            setRecievedCode(data);
            alert("Locations submitted. Your code is " + data);
        });

        console.log("SUBMIT CALLED");
    }


    return (
        <div>
            <div>
                <p>{recievedCode}</p>
                <button
                    onClick={onSubmit}
                >Submit
                </button>
            </div>
        
            <div className = "map">
                <Map
                markers={markers}
                setMarkers={setMarkers}
                />
            </div>
        </div>
        

    );

}

export default CreateGame;
