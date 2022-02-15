import React, { Component } from 'react'
import { connect } from 'react-redux'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const BOARD_PATH = '/leader-board';

export class LeaderBoard extends Component {
  usersOrdered = Object.values(this.props.users).sort((a, b) => (
    (Object.keys(b.answers).length + Object.keys(b.questions).length) - (Object.keys(a.answers).length + Object.keys(a.questions).length)
  ))
  render() {
    return (
      <main>
        {this.usersOrdered.map((user, index) => {
          let color = () => {
            switch(index) {
              case 0:
                return 'gold';
              case 1:
                return '#39C0A9';
              case 2:
                return 'gray';
              default:
                return 'black'
            }
          }
          return <LeaderBoardItem key={user.name} user={user} color={color()} />
        })}
      </main>
    )
  }
}

const mapStateToProps = ({users}) => ({
  users
})

export default connect(mapStateToProps)(LeaderBoard)

function LeaderBoardItem({user, color}) {
  const verticalBar = {
    height: '150px',
    backgroundColor: "grey",
    width: "1px",
    margin: "auto 0"
  };
  const questionsAnswered = Object.values(user.answers).length;
  const questionsCreated = Object.values(user.questions).length;
  return (
    <div className="flex mx-auto mt-6 w-fit border-2 border-gray-300 rounded">
      <div style={{
         position : "absolute",
         height : "0",
         width : "0",
         borderBottom : '60px solid transparent',
         borderLeft : '60px solid silver',
      }}>
      </div>
      <EmojiEventsIcon style={{
          color: color,
          position: 'absolute',
          margin: '4px'
        }}/>
      <figure className="p-7">
        <img src={user.avatarURL} alt="profil" className="rounded-full"/>
      </figure>
      <div style={verticalBar}></div>
      <article className="m-4 pb-4 w-60 flex flex-col font-bold">
        <h3 className="text-2xl flex-1">{user.name}</h3>
        <div className="flex justify-between">
          <p>Answered questions</p>
          <p>{questionsAnswered}</p>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between">
          <p>Created questions</p>
          <p>{questionsCreated}</p>
        </div>
      </article>
      <div style={verticalBar}></div>
      <aside className="m-4 border-2 border-gray-200 rounded flex flex-col">
        <header className="text-center bg-gray-100 px-6 py-3">
          Score
        </header>
        <hr />
        <div className="w-fit mx-auto flex-1 flex flex-col justify-center">
          <mark className="bg-primary-color p-4 rounded-full w-16 h-16 text-center text-white font-bold text-2xl">
            {questionsAnswered + questionsCreated}
          </mark>
        </div>
      </aside>
    </div>
  )
}