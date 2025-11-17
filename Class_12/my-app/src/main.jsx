import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.jsx'
import Counter from './Counter.jsx';
import TodoList from './TodoList.jsx';
import ResizeWindow from './ResizeWindow.jsx';
import Navbar from './Navbar.jsx';
import Tab from './Tab.jsx';
import Column from './Column.jsx';
import ProductList from './ProductList.jsx';
import Product from './Product.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Navbar/>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/counter" element={<Counter/>}>
            <Route index path='/counter/tab' element={<Tab/>} />
            <Route index path='/counter/column' element={<Column/>} />
        </Route>
        <Route path="/todolist" element={<TodoList/>} />
        <Route path="/resizewindow" element={<ResizeWindow/>} />

        <Route path='/productlist' element={<ProductList/>}>
            <Route path=':id' element={<Product/>}/>
        </Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  </StrictMode>,
)
