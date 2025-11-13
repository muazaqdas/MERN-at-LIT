import React from 'react'

const Container = ({name, color, children})=> {
  return (
    <div style={{background:'#fff', border:"1px solid red", color:'#000'}}>
        <p>{name}'s fav color is {color} hehe</p>
        {children}
    </div>
  )
}

export default Container;