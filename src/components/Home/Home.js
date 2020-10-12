import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Destination from '../Destination/Destination';
import image from '../../Image/Background.png'
import './Home.css'
import { Grid } from '@material-ui/core';
import Header from '../Header/Header';


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
    const interval = 3000;
    const slides = document.querySelectorAll('slide')
    let index = 1;
    const startSlide = () => {
        setInterval(() => {
            index++;
            console.log('started')
        }, interval);
    }
    startSlide();

    const [destination, setDestination] = useState([]);
    const handleClick = (info) => {
        setDestination(info);
    }
    return (
        <div className="back-img" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${image}')` }}>
            <div className={classes.root} >
                <Header />
                <Grid container className={classes.root} spacing={10}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <div className="info">
                                    <h1>{destination.name}</h1>
                                    <p>{destination.details}</p>
                                    <Link className="btn-login" to={`/booking/${destination.key}`}><ColorButton variant="contained" color="primary" className={classes.margin}>  Booking -> </ColorButton></Link>
                                </div>
                            </Grid>
                            {
                                Destination.map(info =>
                                    <Grid item className="slide">
                                        <img className="destinationImg" onClick={() => handleClick(info)} src={info.image} key={info.key} alt="" />
                                    </Grid>)
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Home;