import {fetchUsers} from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function getUsers() {
  return async dispatch => {
    const users = await fetchUsers();
    return dispatch(receiveUsers(users));
  }
}

export function addUserAnswer(authedUser, qid, answer) {
  return {
    type: ADD_USER_ANSWER,
    qid,
    answer,
    authedUser
  }
}