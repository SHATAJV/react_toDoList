
import './App.css'
import React, { useState } from 'react'
import Task from './components/Task';
import ToDolist from './components/ToDoList';
import AddTodoform from './components/AddTodoForm';

const App = () =>{
  const [tasks,setTasks] = useState([
    {id: 1, title :"learn React"},
    {id:2, title: "create a toDoList"},
    {id:3, title: "practice more"},
    {id:4, title: "Do Sport"}

  ]);

  const handleAddTask = (title) =>{
    const newTask = {id: tasks.length +1, title};
    setTasks([...tasks, newTask])
  };
  return(
    <div>
      <h1> ToDo List with React</h1>
      <AddTodoform onAddTask={handleAddTask} />
      <ToDolist tasks={tasks} />
    </div>
  );
};
export default App; 