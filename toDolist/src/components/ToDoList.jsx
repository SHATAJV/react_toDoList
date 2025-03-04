import React from "react";
import Task from "./Task";

const ToDolist = ({ tasks, onToggle, onDelete, onEdit }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default ToDolist;
