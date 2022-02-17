import { ADD_AUTHED_ANSWER, SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch(action.type) {
    case SET_AUTHED_USER:
      return action.id
    case ADD_AUTHED_ANSWER:
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.qid]: action.answer
        }
      }
    default:
      return state;
  }
}