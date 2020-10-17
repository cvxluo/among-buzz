import React, { useState } from 'react';

import Map from './Map';

import './CreateGame.css';

function CreateGame(props) {    

    const [markers, setMarkers] = useState([]);

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
        fetch('http://localhost:5000/create_game', {
            method: 'POST',
            headers: {
                "content_type":"application/json",
            },
            body: JSON.stringify(markersJSON),
        })
        .then((response) => console.log(response));

        console.log("SUBMIT CALLED");
    }


    return (
        <div>
            <div>
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
