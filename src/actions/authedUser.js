export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const ADD_AUTHED_ANSWER = 'ADD_AUTHED_ANSWER';

export function setAuthedUser (id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}

export function addAuthedAnswer(qid, answer) {
  return {
    type: ADD_AUTHED_ANSWER,
    qid,
    answer
  }
}