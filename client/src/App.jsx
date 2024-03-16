import { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import axios from "axios";

import './App.css'
import { AuthContext } from "./helpers/AuthContext";
import Login from "./pages/Login"
import Registration from "./pages/Registration";
import Home from "./pages/Home";
function App() {
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false});

  useEffect(() => {
    axios.get("http://localhost:3005/users/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({...authState, status:false});
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        })
      }
    })
  }, [])

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/register" element={<Registration/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  )
}

export default App
