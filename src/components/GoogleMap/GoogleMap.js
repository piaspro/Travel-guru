import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';
 
const SimpleMap = () => {
 
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '600px', width: '400px', borderRadius: '20px', paddingTop: '65px', paddingLeft: '50px'  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBA2aNuMugMhNpw-kTcMG_ehqt2HLQG1E4' }}
          defaultCenter={{ lat: 23.450001, lng: 91.199997}}
          defaultZoom={10}
        >
        <Marker position={{ lat: 23.450001, lng: 91.199997}} />
        </GoogleMapReact>
      </div>
    );
  }

 
export default SimpleMap;