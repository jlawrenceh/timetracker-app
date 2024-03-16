import React, {useState, useContext, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authState, setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {

    const data = { username: username, password: password };
    
    axios.post("http://localhost:3005/users/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);

        setAuthState({
          username: response.data.username, 
          id: response.data.id, 
          status: true});

        console.log(response.data);
        console.log("login success");
      }
    });
  };
  return (
    <div>
         <h3>
          Login
        </h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          <input type="text"  placeholder="Username" 
              onChange={(event) => setUsername(event.target.value)}/>
          
          <input type="password"  placeholder="password" 
              onChange={(event) => setPassword(event.target.value)}/>
          
          <button onClick={login}>Login</button>

        
        </div>
        

          
    </div>
  )
}

export default Login