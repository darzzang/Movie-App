import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register,Login,Home, Detail, Recommendation, NotFound } from "pages"; // 웹팩에서 절대경로로 접근할 수 있게 설정되어있음

import './index.css'

const App = () => {
    return (
      <div>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/detail' element={<Detail/>}/>
          <Route path='/recommend' element={<Recommendation/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    );
  };
  
  ReactDOM.render(<BrowserRouter>
                    <App /> 
                  </BrowserRouter>, 
                  document.getElementById("app"));