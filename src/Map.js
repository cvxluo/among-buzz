import React, { useState } from 'react';
import ReactDOM from 'react-dom';


import { Map, InfoWindow, Marker, Circle, GoogleApiWrapper } from 'google-maps-react';
import { usePosition } from 'use-position';
import MyMarker from './MyMarker';


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

    const { markers, setMarkers } = props;

    const [isShowingInfo, showInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});


    console.log(latitude);
    console.log(longitude);


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
            onClick={(_, map, coord) => {
                if(markers.length < 5) {
                    setMarkers([
                        ...markers,
                        coord.latLng,
                    ]);
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
                radius={4}
                center={{
                    lat: (latitude) ? latitude : 20,
                    lng: (longitude) ? longitude : 40,
                }}
                
                onMouseover={() => console.log('mouseover')}
                onClick={() => console.log('click')}
                onClick={(_, map, coord) => {
                    if(markers.length < 5) {
                        setMarkers([
                            ...markers,
                            coord.latLng,
                        ]);
                    }
                }}
                onMouseout={() => console.log('mouseout')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#00cae9'
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

            <MyMarker
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
  