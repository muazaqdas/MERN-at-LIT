import React, { useState } from 'react'
import { useParams } from 'react-router';


const  Product = ({title, descrp, price}) => {
  const { id } = useParams();
  console.log("product params:", id
    
  )
  const [quant, setQuant]  =  useState(0);

  const handleIncrement = ()=>{
    setQuant( (prevValue) => { return ++prevValue } );
  }
  const handleDecrement = () =>{
    setQuant( (prevValue) => { return --prevValue } );
  } 

  return (
    <div style={{background:"teal"}}>
      <h2>{title}</h2>
      <h2>{id}</h2>
      <h2>{descrp}</h2>
      <h2>{price}</h2>
      <button onClick={handleDecrement}> - </button>
      <h3>{quant}</h3>
      <button onClick={handleIncrement}> + </button>
      <h1>Hululu World</h1>
    </div>
  )}

export default Product;