import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {receiveUsers} from './actions/users';
import './App.css';
import Header from './components/Header';
import SignIn, {SIGNIN_PATH} from './components/SignIn';
import {_getUsers} from './utils/_DATA';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home, {HOME_PATH} from './screens/Home';
import QuestionItem from './components/QuestionItem';
import LoadingBar from 'react-redux-loading'

function App({authedUser = {id: ""}, loading, getQuestions, getUsers, showLoading, hideLoading}) {
  useEffect(() => {
    _getUsers().then(users => {
      getUsers(users)
    });
  }, [getUsers]);
  return (
    <Router>
      <div className="App">
        <Header />
        <LoadingBar/>
        <Routes>
          {!authedUser ? <Route path={HOME_PATH} element={<SignIn/>}/> :
          <>
            <Route exact path={HOME_PATH} element={<Home/>}/>
            <Route exact path='/question/:id' element={loading ? <LoadingBar/> : <QuestionItem />}/>
          </>}
        </Routes>
      </div>
    </Router>
  );
}

function mapStateToProps({authedUser, questions}) {
  return {
    authedUser,
    loading: Object.keys(questions).length === 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: users => dispatch(receiveUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
