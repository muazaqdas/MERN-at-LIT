import React, { useState } from 'react'
import Product from './Product';
import Navbar from './Navbar';

export default function Counter() {

    const [toggle, setToggle]  = useState(false);

  return (
    <div> 
        <Navbar/>
        <button onClick={() => setToggle(!toggle)}> Toggle Card</button>
        { toggle && <Product/>}
      
    </div>
  )
}
