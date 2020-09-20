import React from 'react'; 
import './Coxsbazar.css'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';

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
    }));

const Coxsbazar = () => {
    
    const classes = useStyles();
    return (
        <div className="destination">
            <div className="info">
                <h1>COX'S BAZAR</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                <Link className="btn-login" to="/coxsbazar"><ColorButton variant="contained" color="primary" className={classes.margin}>  Booking -> </ColorButton></Link>
            </div>
        </div>
    );
};

export default Coxsbazar;