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
    
    const { markers, setMarkers } = props;

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
                    markers.splice(activeMarker.index, 1);
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
        width: '75%',
        height: '75%'
    }

    return (
        <Map 
            google={props.google} 
            zoom={20}
            center={{
                lat: (latitude) ? latitude : 20,
                lng: (longitude) ? longitude : 40,
            }}
            onClick={(_, map, coord) => {
                if(markers.length < 5) {
                    setMarkers([
                        ...markers,
                        coord.latLng,
                    ]);
                } else {
                    console.log("Marker limit reached.")
                }
            }}
            style={style}
        >

            {
                markers.map(
                    (coords, index) => (
                        <Marker
                            key={index}
                            position={coords} 
                            name={'test'}
                            title={'test'}
                            onClick={(props, marker, e) => onMarkerClick(props, marker, e, index)}
                        />
                    )
                )
            }

            <Circle
                radius={10}
                center={{
                    lat: (latitude) ? latitude : 20,
                    lng: (longitude) ? longitude : 40,
                }}
                onMouseover={() => console.log('mouseover')}
                onClick={() => console.log('click')}
                onMouseout={() => console.log('mouseout')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.2}
            />

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
  