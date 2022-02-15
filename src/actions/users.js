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
  return (dispatch) => {
    dispatch(showLoading());
    return fetchUsers().then(users => dispatch(receiveUsers(users))).then(() => dispatch(hideLoading()))
  }
}