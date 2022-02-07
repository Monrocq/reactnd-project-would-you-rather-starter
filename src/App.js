import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {handleInitialData} from './actions/shared';
import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';

function App({dispatch, users}) {
  useEffect(() => {
    dispatch(handleInitialData())
  }, [dispatch])
  return (
    <div className="App">
      <Header />
      <SignIn />
    </div>
  );
}

export default connect()(App);
