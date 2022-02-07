import React from 'react'
import './style.css'

function NavItem({name}) {
  return (
    <div className="px-7 pb-3 pt-9 cursor-pointer trapeze flex justify-center items-center">
      <li className="text-center ">{name}</li>
      {name.includes('Hello') && (
        <img src="thumbnails/Adel.jpeg" alt="" width="35" className="rounded-full ml-3"/>
      )}
    </div>
  )
}

export default NavItem
