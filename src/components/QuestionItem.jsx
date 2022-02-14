import React from 'react';
import { connect } from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom';
import {_saveQuestionAnswer} from '../utils/_DATA';
import { HOME_PATH } from '../screens/Home';

function QuestionItem({question, user, questions, users, authedUser, dispatch}) {
  const params = useParams();
  let navigate = useNavigate();
  const preview = !!question;
  question ??= questions.unansweredQuestions[params.id];
  user ??= users[question.author];
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
    <div className="border-gray-300 border-2 rounded m-5 max-w-2xl mx-auto">
      <header className="bg-gray-100 p-4">
        <h5 className="font-bold">{user.name+" asks :"}</h5>
      </header>
      <figure className="flex">
        <aside className="py-7 px-12">
          <img src={user.avatarURL} alt="profil" className="rounded-full" width={preview ? "120" : "220"}/>
        </aside>
        <div style={{
          height: '120px',
          backgroundColor: "grey",
          width: "1px",
          margin: "auto 0"
        }}></div>
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
              to={`/question/${question.id}`} 
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
      </figure>
    </div>
  )
}

const mapStateToProps = ({questions, users, authedUser}) => ({
  questions,
  users,
  authedUser
})

export default connect(mapStateToProps)(QuestionItem)
