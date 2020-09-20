import React from 'react';
import Coxsbazar from '../Coxsbazar/Coxsbazar';
import Destination from '../Destination/Destination';
import './Home.css'

const Home = () => { 
    

    return (
            <div className='header'>
                <div className="location">
                    <Coxsbazar></Coxsbazar>
                    <Destination></Destination>
                </div>
            </div>
    );
};

export default Home;