import React, { useState } from 'react';
import './Booking.css';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DatePickerNew from '../DatePickerNew/DatePickerNew';
import Destination from '../Destination/Destination';
import { useParams } from 'react-router-dom';
import image from '../../Image/Background.png'
import Header from '../Header/Header';

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
  const { name, details, key } = destination[id];
  return (
    <div className="back-img" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${image}')` }}>
      <div className={classes.root}>
        <Header></Header>
        <Grid container justify="center" spacing={3}>
          <Grid item lg={4} sm={6}>
            <div className="info">
              <h1>{name}</h1>
              <p>{details}</p>
            </div>
          </Grid>
          <Grid item lg={4} sm={6}>
            <DatePickerNew name={name} id={key} ></DatePickerNew>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Booking;