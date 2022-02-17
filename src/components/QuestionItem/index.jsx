import React from 'react';
import { connect } from 'react-redux'
import {Navigate, useParams} from 'react-router-dom';
import QuestionForm from './QuestionForm';
import QuestionResult from './QuestionResult';


function QuestionItem({question, user, questions, users, authedUser, answered = false}) {
  const params = useParams();
  const preview = !!question;
  question ??= answered ? questions.answeredQuestions[params.id] : questions.unansweredQuestions[params.id];
  if (question === undefined) {
    return <Navigate to='/404'/>
  }
  user ??= users[question.author];
  return (
    <div className="border-gray-300 border-2 rounded m-5 max-w-2xl mx-auto">
      <header className="bg-gray-100 p-4">
        <h5 className="font-bold">{answered ? ("Asked by "+user.name) : (user.name+" asks :")}</h5>
      </header>
      <figure className="flex">
        <aside className="py-7 px-12 flex flex-col justify-center">
          <img src={user.avatarURL} alt="profil" className="rounded-full max-h-40" width={preview ? "120" : "220"} />
        </aside>
        <div style={{
          height: '150px',
          backgroundColor: "grey",
          width: "1px",
          margin: "auto 0"
        }}></div>
        {!preview && answered ? <QuestionResult question={question} authedUser={authedUser}/> : (
          <QuestionForm preview={preview} question={question} authedUser={authedUser} answered={answered}/>
        )}
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
