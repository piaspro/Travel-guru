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

const Home = () => {

    const [destination, setDestination] = useState(Destination[0]);
    const handleClick = (info) => {
        setDestination(info);
    }
    return (
        <div className="back-img" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${image}')` }}>
            <div>
                <div className="header">
                    <Header/>
                </div>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Grid item>
                                <div className="info">
                                    <h1>{destination.name}</h1>
                                    <p>{destination.details}</p>
                                    <Link className="btn-login" to={`/booking/${destination.key}`}><ColorButton variant="contained" color="primary">  Booking -> </ColorButton></Link>
                                </div>
                            </Grid>
                            <Grid item>
                                <Grid container justify="center">
                                    {
                                        Destination.map(info =>
                                            <div className="slide">
                                                <Grid item>
                                                    <img className="destinationImg" key={info.key} onClick={() => handleClick(info)} src={info.image} key={info.key} alt="" />
                                                </Grid>
                                            </div>
                                        )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Home;