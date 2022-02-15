import { showLoading, hideLoading } from 'react-redux-loading';
import {fetchQuestions} from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions, authedUser) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
    authedUser
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function getQuestions(authedUser) {
  return async dispatch => {
    dispatch(showLoading());
    const questions = await fetchQuestions();
    dispatch(receiveQuestions(questions, authedUser && authedUser.id));
    return dispatch(hideLoading());
  }
}