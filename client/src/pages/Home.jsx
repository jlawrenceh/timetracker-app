import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

function Home() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [listOfProjects, setListOfProjects] = useState([]);
  const [listOfTasks, setListOfTasks] = useState([]);
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
      <button>add project</button>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        {listOfProjects.map((project, key) => {
          return (
            <div>
              {project.id} | {project.name} | total hours: {project.totalHours}  
              | <button onClick={ () => navigate(`/project/${project.id}`)}> View</button>
              <button onClick={ () => navigate(`/project/${project.id}`)}> Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home