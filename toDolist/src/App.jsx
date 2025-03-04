import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Task from './components/Task';
import ToDolist from './components/ToDoList';
import AddTodoform from './components/AddTodoForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState('toutes');

  useEffect(() => {
    axios
      .get('http://localhost:5000/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Erreur lors de la récupération des tâches:", error));
  }, []);
  
  const handleAddTask = (title, priority) => {
    const newTask = { title, completed: false, priority };
  
    axios
      .post('http://localhost:5000/tasks', newTask)
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

  const remainingTasksCount = tasks.filter(task => !task.completed).length;

  const handleFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const filteredTasks = filterPriority === 'toutes' 
    ? tasks 
    : tasks.filter(task => task.priority === filterPriority);

    return (
      <div>
        <h1>ToDo List with React</h1>
        <AddTodoform onAddTask={handleAddTask} />
        
        <div>
          <label>Filtrer par priorité: </label>
          <select onChange={handleFilterChange} value={filterPriority}>
            <option value="toutes">Toutes</option>
            <option value="basse">Basse</option>
            <option value="moyenne">Moyenne</option>
            <option value="haute">Haute</option>
          </select>
        </div>
    
        <div>
          <p>Il reste {remainingTasksCount} tâche(s) à accomplir</p>
        </div>
          <ToDolist tasks={filteredTasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
      </div>
    );
    
};

export default App;
