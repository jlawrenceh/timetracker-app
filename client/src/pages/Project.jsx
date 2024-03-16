import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Project() {

    let {id} = useParams();
    const {authState} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [projectObj, setProjectObj] = useState({});
    const [totalHours, setTotalHours] = useState(0);
    const [projectName, setProjectName] = useState("");
    useEffect(() => {

       
        axios.get(`http://localhost:3005/tasks/byProjectId/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            setTasks(response.data);
        })

        axios.get(`http://localhost:3005/projects/projectname/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            setProjectName(response.data);
        })
    }, [])

    useEffect(() => {
        let total = 0;
        tasks.forEach(task => {
            total += task.hours;
        });
        setTotalHours(total);
    }, [tasks]);

  return (
    
    <div>
        <h3>Project: {projectName} </h3>
        <h3>total hours : {totalHours} </h3>
        <div>
            <button>Add Task</button>
        </div>
        
        {tasks.map((task, key) => {
            return (
                <>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <span> task : {task.taskname}  </span>
                        <span>  description:  {task.description} </span>
                        <span>  number of hours:  {task.hours} </span>
                        <span> --------------------------------------------</span>
                    </div>
                </>
            )
        })}
    </div>
  )
}

export default Project