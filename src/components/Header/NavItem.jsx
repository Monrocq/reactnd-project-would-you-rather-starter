import React from 'react'
import authedUser from '../../reducers/authedUser'
import './style.css'

function NavItem({name, action, image}) {
  return (
    <div 
      className="px-7 pb-3 pt-9 trapeze flex justify-center items-center" 
      onClick={action ? action : undefined}
    >
      <li className="text-center">{name}</li>
      {name.includes('Hello') && (
        <img src={image || ''} alt="Avatar" width="35" className="rounded-full ml-3"/>
      )}
    </div>
  )
}

export default NavItem
