import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

export default function ResizeWindow() {  
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const handleResize = ()=> {
            setWidth(window.innerWidth);
            console.log("width:", window.innerWidth)
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup - remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
    <div>
        <Navbar/>
        <h3>Fear not when I am Here HAHAHAHAHA....</h3>
        <p>Window width: {width}px</p>
    </div>
  )
}
