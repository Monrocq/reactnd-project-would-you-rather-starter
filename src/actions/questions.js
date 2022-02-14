export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

export function receiveQuestions(questions, authedUser) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
    authedUser
  }
}