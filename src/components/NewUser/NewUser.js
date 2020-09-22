import React, { useContext, useState } from 'react';
import Input from '@material-ui/core/Input';
import {userContext} from '../../App'
import './NewUser.css'
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import google from '../../Image/Icon/google.png';
import facebook from '../../Image/Icon/fb.png';
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

const NewUser = () => {
    const classes = useStyles();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false,
        password: '',
        confirmPassword: ''
    });
    const [loggedInUser, SetLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/hotelPicker" } };
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const handleChange = (e) => {
        let  isFormValid = true;
        if (e.target.name === 'email'){
            isFormValid =/\S+@\S+\.\S+/.test(e.target.value);
        }if (e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 7;
            const passwordNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordNumber;
        }if (e.target.name === 'confirmPassword'){
            const isPasswordValid = e.target.value.length > 7;
            const passwordNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordNumber;
        }if (isFormValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            SetLoggedInUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        const {password, confirmPassword} = {...user};
        if (password !== confirmPassword) {
                alert("Passwords don't match");
        }
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then (res => {
                const newUserInfo = {...user};
                newUserInfo.success = true;
                newUserInfo.error = '';
                setUser(newUserInfo);
                SetLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch( (error) => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                console.log(error.message)
                setUser(newUserInfo);
            });
        }
        e.prevent.default();
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
          }).catch( error => {
              const newUserInfo = {...user};
              newUserInfo.error = error.message;
              setUser(newUserInfo);
              SetLoggedInUser(newUserInfo);
          });  
    }
    const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(fbProvider)
        .then( (result) => {
            console.log(result)
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
            SetLoggedInUser(newUserInfo);            
          });
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
            <div className="form"> 
            <p>email {user.email}</p>
            <p>password {user.password}</p>
            <p>name: {user.name}
        photo: '',
        error: '',
        success: false,
        password: '',
        confirmPassword: ''</p>
                <h2>Create an account</h2>
                    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                        <Input onBlur={handleChange} required id="standard-required" label="Required" defaultValue="First Name" /> <br/> <br/>
                        <Input onBlur={handleChange} required id="standard-required" label="Required" defaultValue="Last Name" /> <br/> <br/>
                        <Input onBlur={handleChange} required id="standard-required" label="Required" defaultValue="Email" /> <br/> <br/>
                        <Input onBlur={handleChange} required id="standard-password-input" label="Required" type="password" defaultValue="Password" /> <br/> <br/>
                        <Input onBlur={handleChange} required id="standard-password-input" label="Required" type="password" defaultValue="Confirm Password" /> <br/> <br/>
                        <input className="input-btn" type="submit" value="Create an account"/>
                    </form>
                    <p style={{color:'red'}}>{user.error}</p> 
                    {user.success && <p style={{color:'green'}}>Successfull</p> }
                    <h5>Already have an account? <Link to="/login">Login</Link></h5>
            </div>
                <p>---------- or ----------</p>
                <div>
                    <ColorButton  variant="contained" color="primary" className={classes.margin} onClick={handleGoogleSignIn}> <img className="logo" src={google} alt=''/> Sign In with Google </ColorButton>
                <br/>
                    <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleFbSignIn}> <img className="logo" src={facebook} alt=''/> Sign In with Facebook </ColorButton>
                </div>
            </div>
    );
};

export default NewUser;