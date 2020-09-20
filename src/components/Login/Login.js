import React, { useContext, useState } from 'react';
import {userContext} from '../../App'
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../NewUser/firebaseConfig';
import google from '../../Image/Icon/google.png';
import facebook from '../../Image/Icon/fb.png';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
        '&:hover': {
        backgroundColor: yellow[700],
        },
    },
    }))(Button);

const Login = () => {
    
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });
    const [loggedInUser, SetLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            // The signed-in user info.
            const {displayName, email, photoURL}= result.user;
            const signedInUser = {name: displayName, isSignedIn: true, email: email, photo: photoURL};
            setUser(signedInUser);
            SetLoggedInUser(signedInUser);
            history.replace(from);
          }).catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            setUser(newUserInfo);
          });
    } 
    const handleFbSignIn = () => {
        const provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
            // The signed-in user info.
            const {displayName, email, photoURL}= result.user;
            const signedInUser = {name: displayName, isSignedIn: true, email: email, photo: photoURL};
            setUser(signedInUser);
            SetLoggedInUser(signedInUser);
            history.replace(from);
          }).catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            setUser(newUserInfo);
          });
    } 
    const handleSubmit = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then( (result) => {
            // The signed-in user info.
            const {displayName, email, photoURL}= result.user;
            const signedInUser = {name: displayName, isSignedIn: true, email: email, photo: photoURL};
            setUser(signedInUser);
            SetLoggedInUser(signedInUser);
            history.replace(from);
          })
        .catch( (error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;
            setUser(newUserInfo);
            });
        e.prevent.default();
    }
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
            setUser(signedOutUser);

          }).catch( (error) => {
              
          });
          
    }
    return (
        <div className="form-container">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input className="input-field" type="text" name="" placeholder="User Name or Email" required/> <br/> <br/>
                    <input className="input-field" type="Password" name="" placeholder="Password" required/> <br/> <br/>
                    <input type="checkbox" name="remember" id=""/> <label htmlFor="remember">Remember Me</label> <br/> <br/>
                    <input className="input-btn" type="submit" value="Sign In"/>
                </form>
                    <p>Don't have account? <Link to="/newUser">Create an account</Link></p>
                    <p>---------- or ----------</p>
                    <p style={{color:'red'}}>{user.error}</p>
                <div>
                    <ColorButton  variant="contained" color="primary" onClick={handleGoogleSignIn}> <img className="icon" src={google} alt=''/> Continue with Google </ColorButton>
                <br/>
                <br/>
                    <ColorButton variant="contained" color="primary" onClick={handleFbSignIn}> <img className="icon" src={facebook} alt=''/> Continue with Facebook </ColorButton>
                </div>
            </div>
    );
};

export default Login;