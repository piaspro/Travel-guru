import React from 'react'; 
import './CoxsbazarBooking.css';
import DatePickerNew from '../DatePickerNew/DatePickerNew';


const CoxsbazarBooking = () => {
    return (
        <div>
            <div className="container">
                <div className="about-destination">
                    <h1>COX'S BAZAR</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                </div>
                <DatePickerNew></DatePickerNew>
            </div>
            
        </div>
    );
};

export default CoxsbazarBooking;