import React, { useState } from 'react';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { usePosition } from 'use-position';


function MapContainer(props) {
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = usePosition(true, {enableHighAccuracy: true});
    
    const [markers, setMarkers] = useState([]);


    return (
        <Map 
            google={props.google} 
            zoom={14}
            center={{
                lat: (latitude) ? latitude : 20,
                lng: (longitude) ? longitude : -100,
            }}
            onClick={(_, map, coord) => {
                setMarkers([
                    ...markers,
                    coord.latLng,
                ]);
            }}
        >

            {
                markers.map(
                    (coords, index) => (
                        <Marker
                            key={index}
                            position={coords} 
                            name={'test'}
                            title={'test'}
                        />
                    )
                )
            }

            <InfoWindow onClose={(event) => console.log(event) }>
                <div>
                    <h1>5</h1>
                </div>
            </InfoWindow>
        </Map>
    );
  }

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAFIVOilN7iPQKB17ImeBGgDqtB6HvAy7M')
})(MapContainer)
  