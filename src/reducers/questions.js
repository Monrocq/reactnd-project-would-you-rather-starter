import { ADD_QUESTION, ADD_QUESTION_ANSWER, RECEIVE_QUESTIONS, SORT_QUESTIONS } from "../actions/questions";

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        unsorted: action.questions
      }
    case SORT_QUESTIONS:
      let unansweredQuestions = {};
      let answeredQuestions = {};
      Object.entries(action.questions).forEach(([key, value]) => {
        if (value.optionOne.votes.includes(action.authedUser) || value.optionTwo.votes.includes(action.authedUser)) {
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
          [action.question.id]: action.question
        }
      }
    case ADD_QUESTION_ANSWER:
      return {
        ...state,
        answeredQuestions: {
          ...state.unansweredQuestions,
          [action.qid]: {
            ...state.unansweredQuestions[action.qid],
            [action.answer]: {
              ...state.unansweredQuestions[action.qid][action.answer],
              votes: state.unansweredQuestions[action.qid][action.answer].votes.concat([action.authedUser])
            }
          }
        }
      }
    default:
      return state;
  }
}
