import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

function Home() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [listOfProjects, setListOfProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [newProject, setNewProject] = useState({ name: ""});
  const {authState} = useContext(AuthContext);


  useEffect(() =>{
    if(!authState.status){
      navigate("/login");
    } else {
    axios
      .get("http://localhost:3005/projects/", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        }
      }).then((response) => {
        setListOfProjects(response.data);
      })
    }

  }, [newProject]);
  
  const addProject = () => {
    axios.post("http://localhost:3005/projects/new", {name: projectName}, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if(!response.data.error){
        setListOfProjects([...listOfProjects, response.data]);
        setProjectName("");
        setNewProject({name: response.data.name});
      }
    });
  }

  const deleteProject = (projectId) => {
    axios.delete(`http://localhost:3005/projects/delete/${projectId}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then(() => {
      setListOfProjects(listOfProjects.filter((project) => project.id !== projectId));
    })
  }

  return (
    <div className="home">
      <h3>Home</h3>
      <div className="new_project_wrapper">
        <input type="text" placeholder="project name" value={projectName} onChange={(event) => setProjectName(event.target.value)} />
        <button onClick={addProject}>Add Project</button>
      </div>
      <div className="projects_container">
        {listOfProjects.map((project, key) => {
          return (
              <div className="project_object">
                <div className="task_object_header">
                  <div>{project.id}</div>
                </div>
              
                <div><h3>{project.name}</h3></div>
                <div><label>Total hours: </label>{project.totalHours}</div>
              
                <button onClick={ () => navigate(`/project/${project.id}`)}> View</button>
                <button onClick={ () => deleteProject(project.id)}> Delete</button>
              </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home