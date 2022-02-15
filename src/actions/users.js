import { showLoading, hideLoading } from 'react-redux-loading';
import {fetchUsers} from '../utils/api';

export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function getUsers() {
  return async dispatch => {
    dispatch(showLoading());
    const users = await fetchUsers();
    dispatch(receiveUsers(users));
    return dispatch(hideLoading());
  }
}