import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Task from './Task';
import ToDoList from './ToDoList';
import AddTodoForm from './AddTodoForm';

const ToDoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState('toutes');
  const [filterDate, setFilterDate] = useState('toutes');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des tâches:", error));
  }, []);

  const handleAddTask = (title, priority) => {
    const newTask = { title, completed: false, priority, date: new Date().toISOString() };
    axios.post('http://localhost:5000/tasks', newTask)
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error("Erreur lors de l'ajout de la tâche:", error));
  };

  const handleToggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    const updatedTask = { ...task, completed: !task.completed };

    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then(() => setTasks(tasks.map((t) => (t.id === id ? updatedTask : t))))
      .catch((error) => console.error("Erreur lors de la mise à jour de la tâche:", error));
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error("Erreur lors de la suppression de la tâche:", error));
  };

  const handleEditTask = (id, newTitle) => {
    const updatedTask = tasks.find((task) => task.id === id);
    if (!updatedTask) return;
    const newTaskData = { ...updatedTask, title: newTitle };

    axios.put(`http://localhost:5000/tasks/${id}`, newTaskData)
      .then(() => setTasks(tasks.map((t) => (t.id === id ? newTaskData : t))))
      .catch((error) => console.error("Erreur lors de la mise à jour de la tâche:", error));
  };

  const filteredTasks = () => {
    let tasksToDisplay = [...tasks];
    if (filterPriority !== 'toutes') {
      tasksToDisplay = tasksToDisplay.filter(task => task.priority === filterPriority);
    }
    if (filterDate === 'aujourd\'hui') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      tasksToDisplay = tasksToDisplay.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= today;
      });
    } else if (filterDate === 'cette_semaine') {
      const today = new Date();
      const startOfWeek = today.getDate() - today.getDay();
      const startOfWeekDate = new Date(today.setDate(startOfWeek));
      tasksToDisplay = tasksToDisplay.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= startOfWeekDate;
      });
    }
    return tasksToDisplay;
  };

  return (
    <div className={theme}>
      <h1>ToDo List avec React</h1>
      <AddTodoForm onAddTask={handleAddTask} />

      <div>
        <label>Filtrer par priorité: </label>
        <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
          <option value="toutes">Toutes</option>
          <option value="basse">Basse</option>
          <option value="moyenne">Moyenne</option>
          <option value="haute">Haute</option>
        </select>
      </div>

      <div>
        <label>Filtrer par date: </label>
        <select onChange={(e) => setFilterDate(e.target.value)} value={filterDate}>
          <option value="toutes">Toutes</option>
          <option value="aujourd'hui">Aujourd'hui</option>
          <option value="cette_semaine">Cette semaine</option>
        </select>
      </div>

      <p>Il reste {tasks.filter(t => !t.completed).length} tâche(s) à accomplir</p>

      <ToDoList
        tasks={filteredTasks()}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
};

export default ToDoPage;
