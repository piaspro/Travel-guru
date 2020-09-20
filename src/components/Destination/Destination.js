import React from 'react';
import img from '../../Image/Sajek.png'
import img2 from '../../Image/Sreemongol.png'
import img3 from '../../Image/sundorbon.png'
import './Destination.css'

const Destination = () => {
    return (
        <div className="display">
            
                <img className="img" src={img} alt=""/>
            
                <img className="img" src={img2} alt=""/>
            
                <img className="img" src={img3} alt=""/>
            
        </div>
    );
};

export default Destination;