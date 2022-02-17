import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home, {HOME_PATH} from './screens/Home';
import QuestionItem from './components/QuestionItem';
import LoadingBar from 'react-redux-loading'
import NewQuestion, {CREATE_PATH} from './screens/NewQuestion';
import LeaderBoard, {BOARD_PATH} from './screens/LeaderBoard';
import NotFound from './screens/NotFound';
import {handleInitialData} from './actions/shared';

function App({authedUser = {id: ""}, organizeQuestions, initData, questions}) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    initData(authedUser).then(() => setLoading(false))
  }, [initData, authedUser]);
  function loadComponent(component) {
    if (loading) {
      return <LoadingBar/>
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
            <Route exact path={HOME_PATH} element={loadComponent(<Home/>)}/>
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
    questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initData: async authedUser => await dispatch(handleInitialData(authedUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);