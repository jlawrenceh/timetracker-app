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

    const editTask = (option, taskid) => {
        if(option === "taskname"){
       
            let newtaskname = prompt("Enter new taskname:");

            if (newtaskname!==null){
                axios.put("http://localhost:3005/tasks/edit/taskname", 
                    { 
                        taskname: newtaskname,
                        id: taskid
                    }, 
                    {
                        headers: {
                            accessToken: localStorage.getItem("accessToken"),
                        }
                    }
                ).then((response) => {
                    alert(response.data);
                })
                setTasks(
                    tasks.map((task) => {
                        if (task.id === taskid) {
                            return { ...task, taskname: newtaskname };
                        }
                        return task;
                    })
                )
            }
        } 
        else if(option === "description") {
            let newdescription = prompt("Enter new description:");
            if (newdescription!==null){
                axios.put("http://localhost:3005/tasks/edit/description", 
                    { 
                        description: newdescription,
                        id: taskid
                    }, 
                    {
                        headers: {
                            accessToken: localStorage.getItem("accessToken"),
                        }
                    }
                ).then((response) => {
                    alert(response.data);
                })
                setTasks(
                    tasks.map((task) => {
                        if (task.id === taskid) {
                            return { ...task, description: newdescription };
                        }
                        return task;
                    })
                )
            }
        } else {
            let newhours = prompt("Enter new hours:");
            if (newhours!==null){
                newhours = parseInt(newhours);
                if (!isNaN(newhours)) {
                    axios.put("http://localhost:3005/tasks/edit/hours", 
                        { 
                            hours: newhours,
                            id: taskid
                        },
                        {
                            headers: {
                                accessToken: localStorage.getItem("accessToken"),
                            }
                        }
                    ).then((response) => {
                        alert(response.data);
                    })
                    setTasks(
                        tasks.map((task) => {
                            if (task.id === taskid) {
                                return { ...task, hours: newhours };
                            }
                            return task;
                        })
                    )

                    tasks.forEach((task) => {
                        if(task.id === taskid){
                            setTotalHours(totalHours - task.hours);
                            setTotalHours(totalHours + newhours);
                        }
                    })
                }
            }
        }
}

    const deleteTask = (taskId) => {

        tasks.forEach((task) => {
            if(task.id === taskId){
                setTotalHours(totalHours - task.hours);
            }
        })
        axios.delete(`http://localhost:3005/tasks/delete/${taskId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            }
        }).then(() => {
            setTasks(
                tasks.filter((task) => {
                    return task.id !== taskId;
                })
            );
        })
    }
  return (
    
    <div>
        <h3>Project: {projectName} </h3>
        <h3>total hours : {totalHours} </h3>
        <div className="new_task_wrapper">
                <input type="text" className="field_name" placeholder="task name" value={newTask.taskname} onChange={(e) => setNewTask({...newTask, taskname: e.target.value})} />
                <input type="text" className="field_description" placeholder="description" value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})}/>
                <input type="number" className="field_hours" placeholder="hours" min="0" value={newTask.hours} onChange={(e)=> setNewTask({...newTask, hours: e.target.value})} />
                <button onClick={addTask}>Add Task</button>
        </div>

        {tasks.map((task, key) => {
            return (
                <>
                    <div className="task_object">
                        <div className="task_object_header">
                            <div className="clickable" onClick={() => editTask("taskname", task.id)}>
                               <h3> {task.taskname}  </h3>
                            </div>  
                            <div>
                            <button onClick={() => deleteTask(task.id)}>x</button> 
                            </div>
                        </div> 
                        
                        <div className="clickable" onClick={() => editTask("description", task.id)}>  
                            <label>description:</label>  
                            {task.description} 
                        </div>
                        <div className="clickable" onClick={() => editTask("hours", task.id)}>
                            <label> hours:</label>  
                            {task.hours}  
                        </div>
                        
                    </div>
                </>
            )
        })}
    </div>
  )
}

export default Project