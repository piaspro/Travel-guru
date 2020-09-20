import React, { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router,
   Switch,
   Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NewUser from './components/NewUser/NewUser';
import CoxsbazarBooking from './components/CoxsbazarBooking/CoxsbazarBooking';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import HotelPicker from './components/HotelPicker/HotelPicker';
import Header from './components/Header/Header';
import Hotels from './components/Hotels/Hotels';

export const userContext = createContext();

function App() {
  
  const [loggedInUser, SetLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, SetLoggedInUser]}>
      <Router>
        <Header/>
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/newUser">
            <NewUser/>
          </Route>
          <Route path="/hotelPicker">
            <Hotels/>
          </Route>
          <Route path="/coxsbazar">
            <CoxsbazarBooking/>
          </Route>
          <PrivateRoute path="/coxsbazar">
            <CoxsbazarBooking/>
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
