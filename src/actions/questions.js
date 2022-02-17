import { showLoading, hideLoading } from 'react-redux-loading';
import {fetchQuestions, saveQuestion} from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SORT_QUESTIONS = 'SORT_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function sortQuestions(questions, authedUser) {
  return {
    type: SORT_QUESTIONS,
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

export function addQuestionAnswer(authedUser, qid, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    answer,
    qid
  }
}

export function handleAddQuestion(answers) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading())

    return saveQuestion({
      optionOneText: answers[0].value,
      optionTwoText: answers[1].value,
      author: authedUser.id
    }).then(question => dispatch(addQuestion(
      question
    ))).then(() => dispatch(hideLoading()))
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