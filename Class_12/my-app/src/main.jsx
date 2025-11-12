import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.jsx'
import Counter from './Counter.jsx';
import TodoList from './TodoList.jsx';
import ResizeWindow from './ResizeWindow.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/counter" element={<Counter/>} />
        <Route path="/todolist" element={<TodoList/>} />
        <Route path="/resizewindow" element={<ResizeWindow/>} />
        {/* <App/> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
