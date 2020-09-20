import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './Header.css';
import logo from '../../Image/Icon/Logo.png';
import { userContext } from '../../App';

const ColorButton = withStyles((theme) => ({
root: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
    backgroundColor: yellow[700],
    },
},
}))(Button);

// const useStyles = makeStyles((theme) => ({
// margin: {
//     margin: theme.spacing(1),
// },
// }));
const  style = {
    height: '50px',
    paddingTop: "10px"
};
  
const Header = () => {
    // const classes = useStyles();
    const [loggedInUser, SetLoggedInUser] = useContext(userContext);
    const handleSignOut = () => {
        firebase.auth().signOut()
        .then( () => {
          const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: ''
            };
            SetLoggedInUser(signedOutUser);

          }).catch( (error) => {
              
          });
          
    }
    return (
        <div>
            <nav className="nav">
                <ul>
                    <li>
                        <img style={style} src={logo} alt=""/>
                    </li>
                    <input type="text" placeholder="Search Your Destination..." className='input'></input>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/contact"> Contact</Link>
                    </li>
                    <li>
                        <Link to="/coxsbazar">Destination</Link>
                    </li>
                </ul>
                <div className="user">
                        <div className="user-info">
                            <img style={style}  src={loggedInUser.photo} alt=""></img> 
                            <h4>{loggedInUser.name}</h4>
                        </div>
                        <div className="btn-login">
                            {loggedInUser.isSignedIn ?
                                <Button variant="contained" color="primary"  onClick={handleSignOut} > Sign Out </Button>
                                : <Link  to="/login"><ColorButton variant="contained" color="primary" > Sign In </ColorButton></Link>
                            } 
                        </div>  
                </div>
                    
            </nav>
        </div>
    );
};

export default Header;