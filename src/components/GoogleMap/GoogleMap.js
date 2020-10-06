import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';
 
const SimpleMap = () => {

  const locations = [
    {
      name: "Location 1",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      name: "Location 2",
      location: { 
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      name: "Location 3",
      location: { 
        lat: 41.3773,
        lng: 2.1585
      },
    },
    {
      name: "Location 4",
      location: { 
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      name: "Location 5",
      location: { 
        lat: 41.4055,
        lng: 2.1915
      },
    }
  ];
 
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '600px', width: '400px', borderRadius: '20px', paddingTop: '65px', paddingLeft: '50px'  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAarM6laJv9yjXjXPMPfK--I-kFYmMnZ4s' }}
          defaultCenter={{ lat: 23.450001, lng: 91.199997}}
          defaultZoom={10}
        >
        <Marker position={{ lat: 23.450001, lng: 91.199997}} />
        </GoogleMapReact>
      </div>
    );
  }

 
export default SimpleMap;