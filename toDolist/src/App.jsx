
import './App.css'
import React, { useEffect, useState } from 'react'
import Task from './components/Task';
import ToDolist from './components/ToDoList';
import AddTodoform from './components/AddTodoForm';

const App = () =>{
  const [tasks,setTasks] = useState([]);
  useEffect(()=>{
    axios
        .get("http://localhost:5000/tasks")
        .then((response)=> setTasks(response.data))
        .catch((error) => console.error("error to recieve the tasks:", error));
  }, []
  );

  const handleAddTask = (title) =>{
    const newTask = { title, completed: false};
    axios
        .post("http://localhost:5000/tasks")
        .then((response)=> setTasks([...tasks, response.data]))
        .catch((error) => console.error("error to add the tasks:", error));
    
  };
  const handdleToggleTask = (id) =>{
    const task = task.find((task)=>task.id===id);
    const updateTask = {...task, completed: !task.completed};
    axios
        .put (`http://localhost:5000/tasks/${id}`,updateTask)
        .then(()=> setTasks(tasks.map((t)=> (t.id===id ? updateTask :t))))
        .catch((error) => console.error("error to update the tasks:", error));
  };  

        const toggleTask = (taskId) => {
          setTasks(tasks.map(task =>
            task.id === taskId ? {...task,completed: !task.completed} : task
          ));
        };
        return(
          <div>
            <h1> ToDo List with React</h1>
            <AddTodoform onAddTask={handleAddTask} />
            <ToDolist tasks={tasks} onToggle={toggleTask}/>
          </div>
        );
        
    
};
export default App; 