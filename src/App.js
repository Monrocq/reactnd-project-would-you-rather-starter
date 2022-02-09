import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {receiveUsers} from './actions/users';
import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import {_getUsers} from './utils/_DATA'

function App({dispatch, users}) {
  useEffect(() => {
    _getUsers().then(users => {
      console.log(users)
      dispatch(receiveUsers(users))
    }) 
    //_getUsers()
  }, [dispatch])
  return (
    <div className="App">
      <Header />
      <SignIn />
    </div>
  );
}

export default connect()(App);
