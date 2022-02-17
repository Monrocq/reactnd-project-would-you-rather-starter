import {hideLoading, showLoading} from "react-redux-loading"
import {getInitialData, saveAnswer} from "../utils/api"
import {addAuthedAnswer} from "./authedUser"
import {addQuestionAnswer, receiveQuestions, sortQuestions} from "./questions"
import {addUserAnswer, receiveUsers} from "./users"

export function handleInitialData(authedUser) {
  return async dispatch => {
    dispatch(showLoading())
    const {users, questions} = await getInitialData()
    dispatch(receiveUsers(users))
    dispatch(receiveQuestions(questions))
    authedUser != null && dispatch(sortQuestions(questions, authedUser.id))
    dispatch(hideLoading())
  }
}

export function saveQuestionAnswer(qid, answer) {
  return async (dispatch, getStore) => {
    const {authedUser} = getStore();
    dispatch(showLoading());
    let answerFormated = {
      authedUser: authedUser.id,
      qid,
      answer
    }
    await saveAnswer(answerFormated);
    dispatch(addQuestionAnswer(authedUser.id, qid, answer))
    dispatch(addUserAnswer(authedUser.id, qid, answer))
    dispatch(addAuthedAnswer(qid, answer))
    const {questions} = getStore();
    authedUser != null && dispatch(sortQuestions(questions.unsorted, authedUser.id))
    dispatch(hideLoading())
  }
}