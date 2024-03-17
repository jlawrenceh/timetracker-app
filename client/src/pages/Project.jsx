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
    const [newTask, setNewTask] = useState({
        name: "",
        description: "",
        hours: 0,
        ProjectId : id
    });
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
    }, [projectName]);
   

    const addTask = () => {

        setTotalHours(totalHours + parseInt(newTask.hours));

        axios.post("http://localhost:3005/tasks/new", newTask, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if(!response.data.error){
                setTasks([...tasks, response.data]);
                setNewTask({taskname: "", description: "", hours: 0, ProjectId: id});
                console.log(response.data);
            }
        })
    }
  return (
    
    <div>
        <h3>Project: {projectName} </h3>
        <h3>total hours : {totalHours} </h3>
        <div>
                <input type="text" placeholder="task name" onChange={(e) => setNewTask({...newTask, taskname: e.target.value})} />
                <input type="text" placeholder="description" onChange={(e) => setNewTask({...newTask, description: e.target.value})}/>
                <input type="number" placeholder="hours" onChange={(e)=> setNewTask({...newTask, hours: e.target.value})} />
                <button onClick={addTask}>Add Task</button>
        </div>

        {tasks.map((task, key) => {
            return (
                <>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <span> <button>X</button> task : {task.taskname}  </span>
                        <span>  description:  {task.description} </span>
                        <span>  number of hours:  {task.hours}  </span>
                        <span> --------------------------------------------</span>
                    </div>
                </>
            )
        })}
    </div>
  )
}

export default Project