import React from 'react'
import ProgressBar from 'react-percent-bar';

function QuestionResult({question, authedUser}) {
  let voted = question.optionTwo.votes.includes(authedUser.id) ? 1 : 0;
  let firstAnswerVotes = question.optionOne.votes.length;
  let secondAnswerVotes = question.optionTwo.votes.length;
  let totalVotes = firstAnswerVotes + secondAnswerVotes;
  return (
    <article className="m-3">
      <h3 className="font-bold text-3xl mb-3">Results:</h3>
      <ResultItem out={firstAnswerVotes} votes={totalVotes} active={voted === 0} entitled={question.optionOne.text}/>
      <ResultItem out={secondAnswerVotes} votes={totalVotes} active={voted === 1} entitled={question.optionTwo.text}/>
    </article>
  )
}

function ResultItem({out, votes, active, entitled}) {
  let percent = out * 100 / votes;
  const activeClass = "border-primary-color bg-secondary-color";
  const inactiveClass = "border-gray-300 bg-gray-100"
  return (
    <div className={"relative rounded p-4 border-2 my-3 "+(active ? activeClass : inactiveClass)}>
      {active && <div className="absolute bg-yellow-400 text-white font-black rounded-full leading-3 p-2 text-xs" style={{
        right: '-15px',
        top: '-15px'
      }}>
        Your<br/>Vote
      </div>}
      <h4 className={"font-bold "+ (active && "text-primary-color")}>
        {entitled}
      </h4>
      <div className="relative bg-gray-200 rounded-xl mt-3">
        <p className="absolute mx-auto text-center text-xs text-white" style={{
          left: percent > 15 ? percent-10+"%" : percent+2+"%"
        }}>
          {percent.toPrecision(3)+"%"}
        </p>
        <ProgressBar fillColor="#39C0A9" percent={percent} />
      </div>
      <h5 className="font-bold text-center text-sm">{out+" out of "+votes+" votes"}</h5>
    </div>
  )
}

export default QuestionResult
