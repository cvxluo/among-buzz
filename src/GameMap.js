import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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

    const { data } = props;

    const tasks = data.tasks;
    console.log(tasks);

    const [isShowingInfo, showInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});


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


    // 280991

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
        </Map>
    );
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAFIVOilN7iPQKB17ImeBGgDqtB6HvAy7M')
})(MapContainer)
  