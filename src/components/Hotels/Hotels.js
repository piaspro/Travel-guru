import React from 'react';
import HotelPicker from '../HotelPicker/HotelPicker';
import img from '../../Image/img.png'
import img2 from '../../Image/img 2.png'
import img3 from '../../Image/img 3.png'
import GoogleMap from '../GoogleMap/GoogleMap';

const Hotels = () => {
    const style = {
        display: 'block',
        marginLeft: '180px',
        marginTop: '50px',
        float: 'left'
    }
    const style2 = {
        display: 'flex'
    }
    const hotels = [
        {
            title: 'Hotel Phoenicia',
            description: 'Standard Single Rooms are designed in open -concept living area and have many facilities.',
            imgUrl: `${img}`,
            bed: 1,
            capacity: 1,
            bedType: 'Single',
            avatar: 'S',
            price: 119
        },
        {
            title: 'Apartment in lost Panorama',
            description: 'Superior Double Rooms are perfectly equipped for traveling couples or friends.',
            imgUrl: `${img2}`,
            bed: 1,
            capacity: 2,
            bedType: 'Double',
            avatar: 'D',
            price: 149
        },
        {
            title: 'Hotel Sea View',
            description: ' Have lots of in-room facilities and are designed in open-concept living area.',
            imgUrl: `${img3}`,
            bed: 2,
            capacity: 4,
            bedType: 'Family',
            avatar: 'F',
            price: 199
        }
    ]
    return (
        <div style={style2}>
            <div style={style}>
            {
                hotels.map(hotel => <HotelPicker key={hotel.bedType} hotel={hotel}></HotelPicker>)
            }
            </div>
            <GoogleMap></GoogleMap>
        </div>
    );
};


export default Hotels;