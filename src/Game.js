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
  const [playersInRange, setPlayersInRange] = useState([]);

  const [amIAlive, setLifeStatus] = useState(true);

  const { data, gameCode } = props;
  const tasks = data['tasks'];
  const uid = data.id;
  console.log(data);
  const isImposter = data.is_impostor;
  console.log("IS IMPOSTOR IN GAME", isImposter)


  const killPlayer = (playerID) => {

    fetch('http://localhost:5000/kill', {
        // fetch('https://hackgt-20.herokuapp.com/kill', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'killerID': uid,
              'victimID': playerID.uid,
            }),
        })
        .then(response => response.text())
        .then((data) => {
          console.log("AFTER KILL", data);
        }
    );
  }


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


  useEffect(() => {
    const interval = setInterval(() => {

      if (latitude || longitude) {
        console.log("UPDATING LOCATION");
        const player_location_info = {
          'lat': latitude,
          'long': longitude,
          'playerID': uid,
        };
        console.log(player_location_info);
        fetch('http://localhost:5000/update_player_location', {
        // fetch('https://hackgt-20.herokuapp.com/update_player_location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(player_location_info),
        })
        .then(response => response.text())
        .then((data) => {
            setLifeStatus(JSON.parse(data.toLowerCase()))
        });
      }
      
      
      fetch('http://localhost:5000/get_players_in_game', {
        // fetch('https://hackgt-20.herokuapp.com/update_player_location', {
            method: 'POST',
            body: gameCode,
        })
        .then(response => response.text())
        .then((data) => {
            const parsed = JSON.parse(data);
            const players = parsed['players'];
            
            // 333857
            setPlayersInRange(players.filter(
              (player) => {
                if (player.uid === uid) return false;
                if (!player.alive) return false;
                const dLat = Math.abs(parseFloat(player.lat) - latitude);
                const dLong = Math.abs(parseFloat(player.long) - longitude)
                if ((dLat + dLong) < 0.0001) {
                  return true;
                }
                return false;
              }
            ))
            console.log("PLAYERS IN GAME", parsed);
        });

    }, 3000);
    return () => clearInterval(interval);
  }, [latitude, longitude, uid]);


  return (
    <div>
      <p className = "format menu">WELCOME TO THE GAME</p>
      {(isImposter) ? 
        <div>
          <p>Nearby players</p>
          <li>
            {(amIAlive) ?
              playersInRange.map(
                (player) => (
                  <ol>
                    <button
                    onClick={() => killPlayer(player)}
                    >
                      {player.username}
                    </button>
                  </ol>
                )
              )
              :
              <p> You're dead! </p>
            }
          </li>
        </div>
      :
      <div>
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
      </div>
      }
      <div className="map">
        <GameMap 
          data={data}
          tasks={tasks}
          changeTaskAvailable={changeTaskAvailable}
          taskInRange={taskInRange}
          changeTaskInRange={setTaskInRange}
          isImposter={true}
          code={gameCode}
        />
      </div>
      <ProgressBar 
        completed={completedAmount}
      />
    </div>
  );
}

export default Game;
