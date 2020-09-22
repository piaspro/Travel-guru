import React, { useState } from 'react'; 
import './CoxsbazarBooking.css';
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

const CoxsbazarBooking = () => {
    const classes = useStyles();
    const [destination, setDestination] = useState(Destination);
    let { id } = useParams();
    const {name, details} = destination[id];
    return (
        <div className={classes.root}>
        <Grid container justify="center" sm={12} xs={12}>
            <Grid container spacing={2} sm={4} xs={12}>
                <Grid item xs={12}>
                    <div className="location">
                        <div className="destination">
                            <div className="info">
                                <h1>{name}</h1>
                                <p>{details}</p>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={4} sm={6} md={6} xs={6}>
               <DatePickerNew name={name}></DatePickerNew>
            </Grid>
        </Grid>
    </div>
    );
};

export default CoxsbazarBooking;