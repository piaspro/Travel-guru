import React, { useContext, useState } from 'react';
import { userContext } from '../../App'
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
import HeaderBlack from '../HeaderBlack/HeaderBlack';

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
        password: '',
        error: ''
    });

    const [loggedInUser, SetLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                // The signed-in user info.
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    name: displayName,
                    isSignedIn: true,
                    email: email,
                    photo: photoURL
                };
                setUser(signedInUser);
                SetLoggedInUser(signedInUser)
                console.log(signedInUser);
                history.replace(from);
            }).catch(error => {
                console.log(error);
            });
    }
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then((result) => {
                console.log(result)
                // The signed-in user info.
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, isSignedIn: true, email: email, photo: photoURL };
                setUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleChange = (e) => {
        let isFormValid = true;
        if (e.target.name === 'name') {
            isFormValid = e.target.value.length > 2;
        } if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        } if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordNumber;
        } if (e.target.name === 'confirmPassword') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordNumber;
        } if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        const { password, confirmPassword } = { ...user };
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        }
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.isSignedIn = true;
                    newUserInfo.error = '';
                    setUser(newUserInfo);
                    SetLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                    SetLoggedInUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    return (
        <div>
            <HeaderBlack></HeaderBlack>
            <div className="form-container">
                <div className="form">
                    <h2>Create an account</h2>
                    <form onSubmit={handleSubmit}>
                        <input onBlur={handleChange} className="input-field" type="text" placeholder="First Name" name="name" required />
                        <input onBlur={handleChange} className="input-field" type="text" placeholder="Last Name" name="lastName" required />
                        <input onBlur={handleChange} className="input-field" type="email" placeholder="Email" name="email" required />
                        <input onBlur={handleChange} className="input-field" type="password" placeholder="Password" name="password" required />
                        <input onBlur={handleChange} className="input-field" type="password" placeholder="Confirm Password" name="confirmPassword" required />
                        <input className="input-btn" type="submit" value="Create an account" />
                    </form>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    <h5>Already have an account? <Link to="/login">Login</Link></h5>
                </div>
                <div className="align-item">
                    <p>---------- or ----------</p>
                    <ColorButton variant="contained" className={classes.margin} onClick={handleGoogleSignIn}> <img className="icon" src={google} alt='' />Continue with Google</ColorButton>
                    <br />
                    <ColorButton variant="contained" className={classes.margin} onClick={handleFbSignIn}> <img className="icon" src={facebook} alt='' />Continue with Facebook</ColorButton>
                </div>
            </div>
        </div>
    );
};

export default NewUser;