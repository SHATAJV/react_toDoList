import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 
import Task from './components/Task';
import ToDolist from './components/ToDoList';
import AddTodoform from './components/AddTodoForm';

const App = () => {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des tâches:", error));
  }, []);
  
  const handleAddTask = (title) => {
    const newTask = { title, completed: false };

    axios
      .post("http://localhost:5000/tasks", newTask) 
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error("Erreur lors de l'ajout de la tâche:", error));
  };

  const handleToggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return; 

    const updatedTask = { ...task, completed: !task.completed };

    axios
      .put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then(() =>
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)))
      )
      .catch((error) => console.error("Erreur lors de la mise à jour de la tâche:", error));
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Erreur lors de la suppression de la tâche:", error));
  };
  

  return (
    <div>
      <h1>ToDo List with React</h1>
      <AddTodoform onAddTask={handleAddTask} />
      <ToDolist tasks={tasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
