import React, { useState } from 'react'; 
import './Booking.css';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DatePickerNew from '../DatePickerNew/DatePickerNew';
import Destination from '../Destination/Destination';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Booking = () => {
    const classes = useStyles();
    const [destination, setDestination] = useState(Destination);
    let { id } = useParams();
    const {name, details, key} = destination[id];
    return (
        <div className={classes.root}>
        <Grid container justify="center" spacing={10}>
            <Grid item>
                <Grid container justify="center" spacing={2}>
                    <Grid item>
                        <div className="location">
                            <div className="destination">
                                <div className="info">
                                    <h1>{name}</h1>
                                    <p>{details}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <DatePickerNew name={name} id={key} ></DatePickerNew>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
    );
};

export default Booking;