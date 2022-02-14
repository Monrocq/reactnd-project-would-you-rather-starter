import React from 'react'
import './style.css'
import {Link} from 'react-router-dom'

function NavItem({name, action, image, active, link}) {
  return (
    <Link 
      className={"px-7 pb-3 pt-9 trapeze flex justify-center items-center "+(active && "trapeze-active text-white")}
      onClick={action ? action : undefined}
      to={link || "/"}
    >
      <li className="text-center">{name}</li>
      {name.includes('Hello') && (
        <img src={image || ''} alt="Avatar" width="35" className="rounded-full ml-3"/>
      )}
    </Link>
  )
}

export default NavItem
