import React from 'react'
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/questions';
import { useNavigate } from 'react-router';
import {HOME_PATH} from './Home';

export const CREATE_PATH = '/add';

export function NewQuestion({addNewQuestion}) {
  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    addNewQuestion(e.target.elements)
    navigate(HOME_PATH)
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

const mapStateToProps = store => {
  return {store}
}

const mapDispatchToProps = dispatch => {
  return {
    addNewQuestion: async answers => await dispatch(handleAddQuestion(answers)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)
