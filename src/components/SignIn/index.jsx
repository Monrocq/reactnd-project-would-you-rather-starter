import React from 'react'
import {connect} from 'react-redux';
import logo from '../../assets/logo.svg';
import './style.css';
import { setAuthedUser } from '../../actions/authedUser';
import {sortQuestions} from '../../actions/questions';

export const SIGNIN_PATH = '/signin'

function SignIn({users, questions, dispatch}) {
  async function signIn(e) {
    e.preventDefault()
    let user = users[e.target.elements[0].value];
    await dispatch(sortQuestions(questions.unsorted, user.id))
    await dispatch(setAuthedUser(user));
  }
  return (
    <div className="container max-w-2xl mx-auto border-gray-300 border-2 my-5">
      <header className="bg-gray-100 text-center py-3 border-b-2 border-b-gray-300">
        <h3 className="text-xl font-bold">Welcome to the Would You Rather App!</h3>
        <p>Please sign in to continue</p>
      </header>
      <form className="flex flex-col justify-center p-4" onSubmit={e => signIn(e)}>
        <img src={logo} className="App-logo mx-auto" alt="logo" />
        <h2 className="text-center text-3xl text-green-500 font-bold">Sign in</h2>
        <select name="" id="" className="my-5 p-2 border-2 border-gray-200">
          {Object.keys(users).length !== 0 && Object.keys(users).map((user, i) => (
            <option value={user} key={i}>{user}</option>
          ))}
        </select>
        <button type="submit" className="bg-emerald-500 py-2 text-white font-bold rounded hover:bg-emerald-700">
          Sign In
        </button>
      </form>
    </div>
  )
}

function mapStateToProps ({users, questions}) {
  return {
    users,
    questions
  }
}

export default connect(mapStateToProps)(SignIn)
