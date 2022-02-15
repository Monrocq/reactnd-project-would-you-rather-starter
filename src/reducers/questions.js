import { ADD_QUESTION, RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions (state = {}, {type, questions, authedUser, question}) {
  switch(type) {
    case RECEIVE_QUESTIONS:
      let unansweredQuestions = {};
      let answeredQuestions = {};
      Object.entries(questions).forEach(([key, value]) => {
        if (value.optionOne.votes.includes(authedUser) || value.optionTwo.votes.includes(authedUser)) {
          answeredQuestions[key] = value;
        } else {
          unansweredQuestions[key] = value;
        }
      })
      return {
        ...state,
        answeredQuestions,
        unansweredQuestions
      }
    case ADD_QUESTION:
      return {
        ...state,
        unansweredQuestions: {
          ...state.unansweredQuestions,
          [question.id]: question
        }
      }
    default:
      return state;
  }
}
