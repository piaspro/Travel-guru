import React from 'react';
import './NotFound.css'
import error from '../../Image/error.jpeg'

const NotFound = () => {
    return (
        <div>
            <img className="error"  src={error} alt=''></img>
        </div>
    );
};

export default NotFound;