import React from 'react'

function TabItem({active, children, onClick}) {
  if (active) {
    return <h4 className="text-primary-color font-bold bg-gray-100 p-2 flex-1" onClick={onClick}>
      {children}
    </h4>
  } else {
    return <h4 onClick={onClick} className="p-2 flex-1">{children}</h4>
  }
}

export default TabItem
