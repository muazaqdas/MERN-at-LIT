import React, { useState } from 'react'


export function sum(a, b){
  console.log('hululu', a+b);
}

const  Product = (props) => {
  

  const [quant, setQuant]  =  useState(0);

  const handleIncrement = ()=>{
    setQuant( (prevValue) => { return ++prevValue } );
  }
  const handleDecrement = () =>{
    setQuant( (prevValue) => { return --prevValue } );
  } 

  return (
    <div>
      <h2>{props.title}</h2>
      <h2>{props.descrp}</h2>
      <h2>{props.price}</h2>
      <button onClick={handleDecrement}> - </button>
      <h3>{quant}</h3>
      <button onClick={handleIncrement}> + </button>
      <h1>Hululu World</h1>
    </div>
  )}

export default Product;