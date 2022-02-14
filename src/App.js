import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {receiveUsers} from './actions/users';
import { receiveQuestions } from './actions/questions';
import './App.css';
import Header from './components/Header';
import SignIn, {SIGNIN_PATH} from './components/SignIn';
import {_getUsers, _getQuestions} from './utils/_DATA';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home, {HOME_PATH} from './components/Home';
import { showLoading, hideLoading } from 'react-redux-loading'

function App({dispatch, authedUser = {id: ""}}) {
  useEffect(() => {
    _getUsers().then(users => {
      dispatch(receiveUsers(users))
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch(showLoading())
    _getQuestions().then(questions => {
      dispatch(receiveQuestions(questions, authedUser && authedUser.id));
      dispatch(hideLoading());
    })
  }, [authedUser, dispatch])
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {!authedUser ? <Route path={HOME_PATH} element={<SignIn/>}/> : 
          <>
            <Route exact path={HOME_PATH} element={<Home/>}/>
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
