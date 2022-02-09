import React from 'react'
import NavItem from './NavItem'
import {connect} from 'react-redux'
import { setAuthedUser } from '../../actions/authedUser';

function Header({authedUser, dispatch}) {
  function logOut() {
    dispatch(setAuthedUser(null))
  }
  function accountItems(actions) {
    return (
      <>
        <NavItem name="Hello, Adel Malik" image={actions ? authedUser.avatarURL : 'thumbnails/Adel.jpeg'}/>
        <NavItem name="Logout" action={actions && logOut} />
      </>
    )
  }
  return (
    <nav className="w-screen border-b-2 border-b-emerald-500">
      <ul className="flex justify-center cursor-pointer">
        <NavItem name="Home" />
        <NavItem name="New Question" />
        <NavItem name="Leader Board" />
        {authedUser === null ? (
          <div className="opacity-0 flex">
            {accountItems(false)}
          </div>
        ) : (
          <div className="flex">
            {accountItems(true)}
          </div>
        )}
      </ul>
    </nav>
  )
}

function mapStateToProps({authedUser}) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Header)
