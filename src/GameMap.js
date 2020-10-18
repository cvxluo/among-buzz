import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import LocationMarker from './MyMarker';
import ProgressBar from './ProgressBar';

import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';
import { usePosition } from 'use-position';




function MapContainer(props) {
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = usePosition(true, {enableHighAccuracy: true});

    /*
    console.log(error);
    console.log(latitude);
    console.log(longitude);
    */

    const { data, changeTaskAvailable, changeTaskInRange, code } = props;

    const uid = data.id;
    const isImpostor = data['is_impostor'];
    const tasks = data['tasks'];
    console.log("IS IMPOSTOR IN MAP", isImpostor);

    const [isShowingInfo, showInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});

    const [otherPlayers, setOtherPlayers] = useState([]);


    useEffect(() => {
        tasks.forEach((task, index) => {
            const dLat = Math.abs(parseFloat(task.lat) - latitude);
            const dLong = Math.abs(parseFloat(task.long) - longitude)
            if ((dLat + dLong) < 0.0001) {
                console.log("IN RANGE DETECED");
                changeTaskInRange(index);
                changeTaskAvailable(true);
                
            }
        });
    }, [latitude, longitude])

    const onMarkerClick = (props, marker, e, i) => {
        showInfoWindow(true);
        setActiveMarker({
            'marker': marker,
            'index': i,
        });
    };

    const onInfoWindowOpen = (props, e) => {
        const button = (                        
            <button
                onClick={event => {
                    tasks.splice(activeMarker.index, 1);
                    setActiveMarker({});
                    showInfoWindow(false);                
                }}
            >
                Remove
            </button>
        );
        ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
    }


    useEffect(() => {
        const interval = setInterval(() => {
          fetch('http://localhost:5000/get_players_in_game', {
            // fetch('https://hackgt-20.herokuapp.com/update_player_location', {
                method: 'POST',
                body: code,
            })
            .then(response => response.text())
            .then((data) => {
                const parsed = JSON.parse(data);
                const players = parsed['players'];
                
                setOtherPlayers(players);
                console.log("PLAYERS IN GAME", parsed);
            });
    
        }, 3000);
        return () => clearInterval(interval);
      });

    const style = {
        width: '100%',
        height: '95%'
    }
    // 108585

    return (
        <Map 
            google={props.google} 
            zoom={20}
            center={{
                lat: (latitude) ? latitude : 33.0,
                lng: (longitude) ? longitude : -84.0,
            }}
            style={style}
            draggable={false}

        >

            {!isImpostor ?
                tasks.map(
                    (coords, index) => (
                        <Circle
                            radius={4}
                            center={{
                                lat: parseFloat(coords.lat),
                                lng: parseFloat(coords.long),
                            }}
                            key={index}
                            strokeColor='transparent'
                            strokeOpacity={0}
                            strokeWeight={5}
                            fillColor='#FF0000'
                            fillOpacity={0.2}
                        />
                    )
                )
                :
                otherPlayers.map(
                    (player, index) => (
                        <Circle
                            radius={4}
                            center={{
                                lat: parseFloat(player.lat),
                                lng: parseFloat(player.long),
                            }}
                            key={index}
                            strokeColor='transparent'
                            strokeOpacity={0}
                            strokeWeight={5}
                            fillColor='#FF0000'
                            fillOpacity={0.2}
                        />
                    )
                )
            }

            <InfoWindow
                marker={activeMarker.marker}
                onOpen={e => {
                    onInfoWindowOpen(props, e);
                }}
                onClose={() => {
                    setActiveMarker({});
                    showInfoWindow(false);
                }}
                visible={isShowingInfo}>
                    <div id='iwc'>

                    </div>
            </InfoWindow>

            <LocationMarker
                position={{
                    lat: latitude,
                    lng: longitude,
                }}
                title={"My Marker"}
            />
        </Map>
    );
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAFIVOilN7iPQKB17ImeBGgDqtB6HvAy7M')
})(MapContainer)
  