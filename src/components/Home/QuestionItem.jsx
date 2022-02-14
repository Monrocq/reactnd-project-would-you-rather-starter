import React from 'react'

function QuestionItem({question, user}) {
  return (
    <div className="border-gray-300 border-2 rounded">
      <header className="bg-gray-100 p-4">
        <h5 className="font-bold">{user.name+" asks :"}</h5>
      </header>
      <figure className="flex">
        <aside className="py-7 px-12">
          <img src={user.avatarURL} alt="profil" className="rounded-full"/>
        </aside>
        <div style={{
          height: '120px',
          backgroundColor: "grey",
          width: "1px",
          margin: "auto 0"
        }}></div>
        <article className="p-4 flex flex-col justify-between items-stretch w-full">
          <h6 className="font-bold">Would you rather</h6>
          <figcaption>{`${question.optionOne.text} / ${question.optionTwo.text}`}</figcaption>
          <button className="border-primary-color border-2 rounded w text-primary-color p-1">View Poll</button>
        </article>
      </figure>
    </div>
  )
}

export default QuestionItem
