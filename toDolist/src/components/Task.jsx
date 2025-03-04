import React from "react";

const Task = ({ task, onToggle, onDelete }) => {
    if (!task) {
      return <li>Erreur: Tâche manquante</li>;
    }
  
    const handleDelete = (e) => {
      e.stopPropagation(); 
      onDelete(task.id);
    };
  
    return (
      <li
        onClick={() => onToggle(task.id)}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        <span>{task.title}</span>
        <button onClick={handleDelete} style={{ color: "brown" }}>
          X
        </button>
      </li>
    );
  };
  
  export default Task;
  


