import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {_saveQuestionAnswer} from '../../utils/_DATA';
import { HOME_PATH } from '../../screens/Home';

function QuestionForm({preview, question, authedUser, answered}) {
  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.answers.value;
    const answer = {
      authedUser: authedUser.id,
      qid: question.id,
      answer: value
    }
    _saveQuestionAnswer(answer).then(() => {
      navigate(HOME_PATH)
    }).catch(error => console.log(error))
  }
  return (
    <form className="p-4 flex flex-col justify-between items-stretch w-full" onSubmit={handleSubmit}>
      <h6 className={"font-bold my-2 "+(!preview ? " text-2xl" : "")}>
        {"Would you rather"+(!preview ? "  ..." : "")}
      </h6>
      <figcaption>
        {preview ? `${question.optionOne.text} / ${question.optionTwo.text}` : (
          <>
            <div>
              <input type="radio" name="answers" value="optionOne" id="one"/>
              <label htmlFor="one" className="m-4">
                {question.optionOne.text}
              </label>
            </div>
            <div>
              <input type="radio" name="answers" value="optionTwo" id="two"/>
              <label htmlFor="two" className="m-4">
                {question.optionTwo.text}
              </label>
            </div>
          </>
        )}
      </figcaption>
      {preview ? (
        <Link 
          to={answered ? `/result/${question.id}` : `/question/${question.id}`} 
          className="border-primary-color border-2 rounded w p-1 text-center my-2 text-primary-color"
        >
          View Poll
        </Link>
      ) : (
        <button 
          className="border-primary-color border-2 rounded w p-1 text-center my-2 text-white bg-primary-color"
          type="submit"
        >
          Submit
        </button>
      )}
    </form>
  )
}

export default QuestionForm
