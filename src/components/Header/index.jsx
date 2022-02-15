import React from 'react'
import NavItem from './NavItem'
import {connect} from 'react-redux'
import { setAuthedUser } from '../../actions/authedUser';
import { useLocation } from 'react-router-dom';
import {HOME_PATH} from '../../screens/Home'
import {CREATE_PATH} from '../../screens/NewQuestion';
import {BOARD_PATH} from '../../screens/LeaderBoard';

function Header({authedUser, dispatch}) {
  const location = useLocation();
  function logOut() {
    dispatch(setAuthedUser(null))
  }
  function accountItems(actions) {
    return (
      <>
        <NavItem name={"Hello, "+ (actions ? authedUser.name : "inconnu")} image={actions ? authedUser.avatarURL : 'thumbnails/Adel.jpeg'} link="#"/>
        <NavItem name="Logout" action={actions && logOut} />
      </>
    )
  }
  return (
    <nav className="w-screen border-b-2 border-b-primary-color">
      <ul className="flex justify-center cursor-pointer">
        <NavItem name="Home" active={location.pathname === HOME_PATH && authedUser} link={HOME_PATH} />
        <NavItem name="New Question" active={location.pathname === CREATE_PATH} link={CREATE_PATH}/>
        <NavItem name="Leader Board" active={location.pathname === BOARD_PATH} link={BOARD_PATH} />
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
