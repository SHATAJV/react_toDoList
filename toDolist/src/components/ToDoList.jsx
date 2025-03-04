import React from "react";
import Task from "./Task";

const ToDolist = ({ tasks, onToggle, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <p>Aucune tâche à afficher.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ToDolist;
