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