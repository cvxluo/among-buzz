import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import LocationMarker from './MyMarker';

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

    const { data, tasks, changeTaskAvailable, changeTaskInRange } = props;

    const uid = data.id;
    console.log(uid);
    console.log(tasks);

    const [isShowingInfo, showInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});


    useEffect(() => {
        tasks.forEach((task, index) => {
            console.log(typeof(parseFloat(task.lat.toFixed(7))), typeof(latitude));
            const dLat = Math.abs(parseFloat(task.lat) - latitude);
            const dLong = Math.abs(parseFloat(task.long) - longitude)
            console.log(dLat);
            console.log(dLong);
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



    const style = {
        width: '100%',
        height: '95%'
    }

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

            {
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
  