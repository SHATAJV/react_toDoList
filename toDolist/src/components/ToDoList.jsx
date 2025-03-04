import React from "react";
import Task from "./Task";

const ToDolist = ({tasks , onToggle, onDelete}) => {
    return(
        <ul>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>

    );
};
export default ToDolist; 