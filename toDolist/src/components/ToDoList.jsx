import React from "react";
import Task from "./Task";

const ToDolist = ({tasks , onToggle}) => {
    return(
        <ul>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onToggle={onToggle}/>
            ))}
        </ul>

    );
};
export default ToDolist; 