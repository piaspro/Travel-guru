import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Destination from '../Destination/Destination';
import './Home.css'
import { Grid } from '@material-ui/core';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
        '&:hover': {
        backgroundColor: yellow[700],
        },
    },
    }))(Button);
    
    const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    }));

const Home = () => { 
    const classes = useStyles();
    
    const [destination, setDestination] = useState([]);
    const handleClick = (info) => {
        setDestination(info);
    }
    return (
    <div className={classes.root}>
        <Grid container justify="center" sm={12} xs={12}>
            <Grid container spacing={2} sm={4} xs={12}>
                <Grid item xs={12}>
                    <div className="location">
                        <div className="destination">
                            <div className="info">
                                <h1>{destination.name}</h1>
                                <p>{destination.details}</p>
                                <Link className="btn-login" to={`/destination/${destination.id}`}><ColorButton variant="contained" color="primary" className={classes.margin}>  Booking -> </ColorButton></Link>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={4} sm={6} md={6} xs={6}>
                {
                    Destination.map(info =>
                        <Grid item xs={12} sm={4} md={4}>
                            <img className=" destinationImg" onClick={() => handleClick(info)} src={info.image} key={info.id} alt="" />
                        </Grid> )
                }
            </Grid>
        </Grid>
    </div>
    );
};

export default Home;