import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

function Home() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [listOfProjects, setListOfProjects] = useState([]);
  const {authState} = useContext(AuthContext);
//authstate.id
  console.log("HOME authState: ", authState);

  
  useEffect(() =>{
    axios
      .get("http://localhost:3005/projects/", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then((response) => {
        setListOfProjects(response.data);
      })
  }, []);
  

  return (
    <div>
      <h3>Home</h3>
      <div>
        {listOfProjects.map((project, key) => {
          return (
            <>
              {project.name}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Home