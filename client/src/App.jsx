import { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import axios from "axios";

import './App.css'

import Login from "./pages/Login"
import Registration from "./pages/Registration";
import Home from "./pages/Home";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/register" element={<Registration/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
