import React, { useState } from 'react';

import Map from './Map';

function CreateGame(props) {    

    const [markers, setMarkers] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("SUBMIT CALLED");
    }


    return (
        <div>
            <button
                onClick={onSubmit}
            >Submit
            </button>
            <Map 
                markers={markers}
                setMarkers={setMarkers}
            />
        </div>

    );
}

export default CreateGame;
