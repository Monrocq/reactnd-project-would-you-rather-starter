import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {receiveUsers} from './actions/users';
import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import {_getUsers} from './utils/_DATA';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home, {HOME_PATH} from './screens/Home';
import QuestionItem from './components/QuestionItem';
import LoadingBar from 'react-redux-loading'
import NewQuestion, {CREATE_PATH} from './screens/NewQuestion';
import LeaderBoard, {BOARD_PATH} from './screens/LeaderBoard';
import NotFound from './screens/NotFound';

function App({authedUser = {id: ""}, loading, getUsers}) {
  useEffect(() => {
    _getUsers().then(users => {
      getUsers(users)
    });
  }, [getUsers]);
  function loadComponent(component) {
    if (loading) {
      return <Navigate to="/"/> 
    }
    return component;
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <LoadingBar/>
        <Routes>
          {!authedUser ? <Route path="*" element={<SignIn/>}/> :
          <>
            <Route exact path={HOME_PATH} element={<Home/>}/>
            <Route exact path={BOARD_PATH} element={<LeaderBoard/>}/>
            <Route exact path={CREATE_PATH} element={loadComponent(<NewQuestion />)}/>
            <Route exact path='/questions/:id' element={loadComponent(<QuestionItem/>)}/>
            <Route exact path='/result/:id' element={loadComponent(<QuestionItem answered={true}/>)}/>
            <Route path="*" element={<NotFound/>}/>
          </>}
        </Routes>
      </div>
    </Router>
  );
}

function mapStateToProps({authedUser, questions}) {
  return {
    authedUser,
    loading: Object.keys(questions).length === 0,
    questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: users => dispatch(receiveUsers(users)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
