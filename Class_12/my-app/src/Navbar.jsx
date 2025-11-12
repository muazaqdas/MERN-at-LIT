import React from 'react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div style={{display:'flex', gap:'8px', alignItems:'center', padding:'12px 22px'}}>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/counter'}>Counter</Link>
        </li>
        <li>
          <Link to={'/todolist'}>Todo List</Link>
        </li>
        <li>
          <Link to={'/resizewindow'}>Resize Window</Link>
        </li>
    </div>
  )
}
