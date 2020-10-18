// acquired from https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4

import React from 'react';
import './Marker.css';

const MyMarker = (props) => {
    const { color, name, id } = props;
    return (
      <div>
        <div
          className="marker pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
        {/* <div className="pulse" ></div> */}
      </div>
    );
  };

  export default MyMarker;