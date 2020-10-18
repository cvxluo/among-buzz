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

  const [inTaskRange, changeTaskAvailable] = useState(false);
  const [taskInRange, setTaskInRange] = useState();

  const { data } = props;
  const tasks = data['tasks'];

  return (
    <div>
      <p className = "format menu">WELCOME TO THE GAME</p>
      <p>{'Can complete task: ' + inTaskRange}</p>
      <button className = "buttonn centered"
        disabled={!inTaskRange}
        onClick={() => {
          console.log("COMPLETE TASK CLICKED");
          console.log("IN RANGE", taskInRange);

          tasks.splice(taskInRange, 1);
          changeTaskAvailable(false);
          setTaskInRange(-1);



        }}
      >Complete task</button>
      <div className="map">
        <GameMap 
          data={data}
          tasks={tasks}
          changeTaskAvailable={changeTaskAvailable}
          taskInRange={taskInRange}
          changeTaskInRange={setTaskInRange}
        />
      </div>
      <div>
      </div>
    </div>
  );
}

export default Game;
