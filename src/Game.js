import React, { useState } from 'react';

import { usePosition } from 'use-position';
 
import GameMap from './GameMap';

import './Game.css';

const exampleData = {
  'tasks' : [
    { 'lat': 37.7747350267414, 'long': -122.41931725974878 },
    { 'lat': 37.8747350267414, 'long': -122.31931725974878 },
    { 'lat': 37.9747350267414, 'long': -122.33931725974878 },
  ],
};


function Game(props) {
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition(true, {enableHighAccuracy: true});

  const { data } = props;

  return (
    <div>
      <button
      disabled={true}
      >Complete task</button>
      <div className="map">
        <p className = "format">game</p>
        <GameMap 
          data={data}
        />
      </div>
    </div>
  );
}

export default Game;
