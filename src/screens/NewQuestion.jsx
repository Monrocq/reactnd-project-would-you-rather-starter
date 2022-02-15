import React from 'react'
import {_saveQuestion} from '../utils/_DATA';
import {connect} from 'react-redux';
import {addQuestion} from '../actions/questions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { useNavigate } from 'react-router';

export const CREATE_PATH = '/question/create';

export function NewQuestion({authedUser, showLoading, hideLoading, addNewQuestion}) {
  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const question = {
      optionOneText: e.target.elements[0].value,
      optionTwoText: e.target.elements[1].value,
      author: authedUser.id
    }
    showLoading();
    _saveQuestion(question).then(result => {
      addNewQuestion(result);
      navigate('/question/'+result.id)
      hideLoading()
    }).catch(error => console.log(error))
  }
  const inputStyle = "border-2 border-gray-100 w-full py-1 px-3 hover:border-primary-color"
  return (
    <main className="border-gray-200 border-2 max-w-xl mx-auto my-5 rounded">
      <h2 className="text-4xl font-bold text-center m-3">Create New Question</h2>
      <hr />
      <form className="p-4" onSubmit={e => handleSubmit(e)}>
        <h6>Complete the question:</h6>
        <h5 className="font-bold text-xl mt-4 mb-2">Would you rather ...</h5>
        <input type="text" placeholder="Enter Option One Text Here" className={inputStyle} />
        <div className="flex items-center">
          <hr className="flex-1"/>
          <h6 className="m-3 font-extrabold font-sans">OR</h6>
          <hr className="flex-1"/>
        </div>
        <input type="text" placeholder="Enter Option Two Text Here" className={inputStyle} />
        <button type="submit" className="border-primary-color border-2 rounded w p-1 text-center my-2 text-white bg-primary-color w-full font-bold mt-5">
          Submit
        </button>
      </form>
    </main>
  )
}

const mapStateToProps = ({authedUser}) => {
  return {authedUser}
}

const mapDispatchToProps = dispatch => {
  return {
    addNewQuestion: question => dispatch(addQuestion(question)),
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)
