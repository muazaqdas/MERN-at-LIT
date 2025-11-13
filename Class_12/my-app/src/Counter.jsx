import React, { useState } from 'react'
import Product from './Product';
import Navbar from './Navbar';
import { Link, Outlet } from 'react-router';

export default function Counter() {

    const [toggle, setToggle]  = useState(false);

  return (
    <div> 
        <button onClick={() => setToggle(!toggle)}> Toggle Card</button>
        { toggle && <Product/>}
        <div style={{display:'flex', gap:"12px"}}>
          <Link to="/counter/tab">Navigate to Tab</Link>
          <Link to="/counter/column">Navigate to Column</Link>
        </div>
      
    </div>
  )
}
