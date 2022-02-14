import { RECEIVE_QUESTIONS } from "../actions/questions";

export default function questions (state = {}, {type, questions, authedUser}) {
  switch(type) {
    case RECEIVE_QUESTIONS:
      let unansweredQuestions = {};
      let answeredQuestions = {};
      Object.entries(questions).forEach(([key, value]) => {
        if (value.optionOne.votes.includes(authedUser)) {
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
    default:
      return state;
  }
}
//te