import React, { useState, useEffect } from 'react';

import { usePosition } from 'use-position';
 
import GameMap from './GameMap';
import ProgressBar from './ProgressBar';

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

  const [completedAmount, setCompletedAmount] = useState(0);

  const { data, gameCode } = props;
  const tasks = data['tasks'];


  useEffect(() => {
    const interval = setInterval(() => {
      console.log("GAME CODE USING:", gameCode);
      fetch('http://localhost:5000/current_tasks', {
        // fetch('https://hackgt-20.herokuapp.com/current_tasks', {
            method: 'POST',
            body: gameCode,
        })
        .then(response => response.text())
        .then((data) => {
            console.log("DATA AQUIRED", data)
            const parsed = JSON.parse(data);
            console.log("PARSED", parsed);
            setCompletedAmount(((parsed.total - parsed.incomplete) / parsed.incomplete)*100);
        });


    }, 5000);
    return () => clearInterval(interval);
  }, []);


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


          fetch('http://localhost:5000/update_tasks', {
          // fetch('https://hackgt-20.herokuapp.com/current_tasks', {
              method: 'POST',
              body: gameCode,
          })
          .then(response => response.text())
          .then((data) => {
              console.log("DATA AQUIRED", data)
          });



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
      <ProgressBar 
        completed={completedAmount}
      />
    </div>
  );
}

export default Game;
