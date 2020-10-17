import React, { useState } from 'react';

import Map from './Map';

import './Game.css';

function Game() {

  const [markers, setMarkers] = useState([]);


  return (
    <div className="map">
      <p>game</p>
      <Map />
    </div>
  );
}

export default Game;
