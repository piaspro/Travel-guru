import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './HeaderBlack.css';
import logo from '../../Image/Icon/Logo.png';
import { userContext } from '../../App';
import { fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MoreIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
}))(Button);
const style = {
  height: '50px',
  paddingTop: "10px"
};
const HeaderBlack = () => {
  const [loggedInUser, SetLoggedInUser] = useContext(userContext);
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: ''
        };
        SetLoggedInUser(signedOutUser);

      }).catch((error) => {
      });
  }
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link className="menuItem onOpen" to="/home">Home</Link>
      </MenuItem>
      <MenuItem>
        <Link className="menuItem onOpen" to="/contact"> Contact</Link>
      </MenuItem>
      <MenuItem>
        <Link className="menuItem onOpen" to="/destination">Destination</Link>
      </MenuItem>
      <MenuItem>
        <div className="btn-login">
          {loggedInUser.isSignedIn ?
            <Button variant="contained" color="primary" onClick={handleSignOut} > Sign Out </Button>
            : <Link to="/login"><ColorButton variant="contained" color="primary" > Sign In </ColorButton></Link>
          }
        </div>
      </MenuItem>
    </Menu>
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <IconButton>
                <img style={style} src={logo} alt="" />
              </IconButton>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton>
                  <Link className="menuItem black" to="/home">Home</Link>
                </IconButton>
                <IconButton >
                  <Link className="menuItem black" to="/contact"> Contact</Link>
                </IconButton>
                <IconButton >
                  <Link className="menuItem black" to="/destination">Destination</Link>
                </IconButton>
                <div className="user">
                  <div className="user-info name">
                    <img style={style} src={loggedInUser.photo} alt=""></img>
                    <h4>{loggedInUser.name}</h4>
                  </div>
                  <div className="btn-login">
                    {loggedInUser.isSignedIn ?
                      <Button variant="contained" color="primary" onClick={handleSignOut} > Sign Out </Button>
                      : <Link to="/login"><ColorButton variant="contained" color="primary" > Sign In </ColorButton></Link>
                    }
                  </div>
                </div>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="black"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default HeaderBlack;