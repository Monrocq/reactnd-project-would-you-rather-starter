import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {receiveUsers} from './actions/users';
import './App.css';
import Header from './components/Header';
import SignIn, {SIGNIN_PATH} from './components/SignIn';
import {_getUsers} from './utils/_DATA';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home, {HOME_PATH} from './components/Home';

function App({dispatch, authedUser}) {
  useEffect(() => {
    _getUsers().then(users => {
      console.log(users)
      dispatch(receiveUsers(users))
    }) 
    //_getUsers()
  }, [dispatch])
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {!authedUser ? <Route path={HOME_PATH} element={<SignIn/>}/> : 
          <>
            <Route exact path={HOME_PATH} component={<Home/>}/>
            <Route path={SIGNIN_PATH} component={<SignIn/>}/> 
          </>}
        </Routes>
      </div>
    </Router>
  );
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
