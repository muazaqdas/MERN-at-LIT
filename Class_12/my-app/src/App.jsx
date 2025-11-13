
import React, { useEffect, useState } from 'react';
import './App.css'
// import Name from './Name';
import Product from './Product';

import TodoList from './TodoList'
import Navbar from './Navbar';
import { Link } from 'react-router';
import Container from './Container';

function App() {
  

  // useEffect to change title on initial render:

  useEffect(
    ()=>{
      document.title = "Hello Vishal";
      console.log("Heelo New ppl");
    }, []
  );

  // count state variable, and useEffect to update count in every 1 second until the App is umount.

  const [count, setCount] = useState(0);
  useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

  useEffect(() => {
        // Set up timer
        const interval  = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);

        // Cleanup function
        return () => {
            clearInterval(interval);  
            console.log("This is the end") // Clear timer when component unmounts
        };
    }, []);  

   

  return (
    <>
       {/* 11 Nov */}
        {/* <Name/> */}
        <div style={{display:"flex", gap:"12px", justifyContent:"space-around", alignItems:"center"}}>
          <Product title="Football" descrp="This is an amazing football" price={3000} />
          <Product title="Basketball" descrp="ofboibnwefjojefn" price={2500} />
          <Product title="Bat" descrp="This is a bat" price={1000} />
        </div>
        <Container name={"Muaz"} color={"red"} children={"Hello"}>
          <p>Hello There</p>
        </Container>
        <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}

export default App


//   var Hello = "Hello There ";
//   console.log(Hello);

//   sum(2+3);

//   const football = {
//     price: 200,
//     title: "Nike Football",
//     descrp:"Very Good Footvball"
//   }
// const  [product, setProduct] = useState(football);
// console.log("product:", product);

// const [isOn, setIsOn] = useState(false);

// const handleToggkle = ()=>{
//   setIsOn(!isOn)
// }

// const handleChange = (e) =>{
//   // console.log("onchnmage event:", e.target.value);

//     setProduct(
//       (prev)=>{
//         return {
//           ...prev,
//           title: e.target.value,
//         };
//       }
//     );
// }


 {/* <div>
       <h2>The bulb is {isOn? "ON": "OFF"}</h2>
        <button onClick={handleToggkle}>
          On / Off
        </button>
        <h1>Product</h1>
        <div>
          <h2>{product.descrp}</h2>
          <h2>{product.title}</h2>
          <input 
            style={{width:"400px", height:"20px", fontSize:"22px"}} 
            placeholder='Enter New Name of the product' 
            onChange={handleChange}
            />
          <h2>{product.price}</h2>
        </div>
       </div>
      <HelloComp  
        title={football.title}
        descrp={football.descrp}
        price={football.price}
        numberOfItems={0}
       /> */}