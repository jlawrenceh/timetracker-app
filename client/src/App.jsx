import { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import axios from "axios";

import './App.css'
import { AuthContext } from "./helpers/AuthContext";
import Login from "./pages/Login"
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Project from "./pages/Project";
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

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({...authState, status: false});
    window.location.reload();
    
  }

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>

        <Router>
        <header>
          <div className="navbar container">
            {authState.status ? (
            <>
              <Link to="/">Home</Link>
              <button onClick={logOut}>logout</button>
            </>
            ) : (
            <>
              <Link to="/login">login</Link>
              <Link to="/register">register</Link>
            </>
            )}
          </div >
        </header>
        <div className="content container" >
          <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/register" element={<Registration/>}/>
            <Route path = "/project/:id" element={<Project/>}/>
          </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </>
  )
}

export default App
