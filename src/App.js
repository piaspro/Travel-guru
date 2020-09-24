import React, { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter as Router,
   Switch,
   Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import NewUser from './components/NewUser/NewUser';
import Booking from './components/Booking/Booking';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Header from './components/Header/Header';
import Hotels from './components/Hotels/Hotels';
import NotFound from './components/NotFound/NotFound';

export const userContext = createContext();

function App() {
  
  const [loggedInUser, SetLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, SetLoggedInUser]} className="App">
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
          <PrivateRoute path="/destination/:id">
            <Booking/>
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path = "*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
