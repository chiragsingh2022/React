// GoogleMap.js
import React from 'react';
import GoogleMapReact from 'google-map-react';

const GoogleMap = () => {
  const defaultCenter = {
    lat: 37.7749,
    lng: -122.4194,
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultCenter}
        defaultZoom={10}
      ></GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
