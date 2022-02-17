import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer} from "./_DATA";

export async function getInitialData() {
  const [users, questions] = await Promise.all([
    _getUsers(),
    _getQuestions()
  ]);
  return ({
    users,
    questions
  });
}

export function fetchUsers() {
  return _getUsers();
}

export function fetchQuestions() {
  return _getQuestions();
}

export function saveQuestion(question) {
  return _saveQuestion(question)
}

export function saveAnswer(answer) {
  return _saveQuestionAnswer(answer);
}