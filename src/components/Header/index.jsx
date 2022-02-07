import React from 'react'
import NavItem from './NavItem'

function Header() {
  return (
    <nav className="w-screen border-b-2 border-b-emerald-500">
      <ul className="flex justify-center">
        <NavItem name="Home" />
        <NavItem name="New Question" />
        <NavItem name="Leader Board" />
        <NavItem name="Hello, Adel Malik" />
        <NavItem name="Logout" />
      </ul>
    </nav>
  )
}

export default Header
