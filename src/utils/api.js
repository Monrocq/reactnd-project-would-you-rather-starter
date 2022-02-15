import {_getUsers, _getQuestions} from "./_DATA";

export function fetchUsers() {
  return _getUsers();
}

export function fetchQuestions() {
  return _getQuestions();
}