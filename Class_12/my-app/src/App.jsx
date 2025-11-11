
import React from 'react';
import './App.css'
import Name from './Name';

import TodoList from './TodoList'

function App() {
  return (
    <>
       {/* 11 Nov */}
        {/* <Name/> */}
        <TodoList/>
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