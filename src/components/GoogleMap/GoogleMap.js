import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-maps-react';
import { useParams } from 'react-router-dom';
 
const SimpleMap = () => {

  const locations = [
    {
      name: "sundorban",
      id: 2,
      location: { 
        lat: 21.9497,
        lng: 89.1833 
      },
    },
    {
      name: "coxsbazar",
      id: 0,
      location: { 
        lat: 21.4272, 
        lng: 92.0058}
    },
    {
      name: "sreemongol",
      id: 1,
      location: { 
        lat: 24.3065,
        lng: 91.7296
      },
    }
  ];
  let { key } = useParams();
  const findLocation = locations.find(element => element.id == key);
  console.log(findLocation.location)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '600px', width: '400px', borderRadius: '20px', paddingTop: '65px', paddingLeft: '50px'  }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAarM6laJv9yjXjXPMPfK--I-kFYmMnZ4s' }}
          defaultCenter={findLocation.location}
          defaultZoom={12}
        >
        <Marker position={{ lat: 23.450001, lng: 91.199997}} />
        </GoogleMapReact>
      </div>
    );
  }

 
export default SimpleMap;