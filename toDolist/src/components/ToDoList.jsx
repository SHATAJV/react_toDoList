import React from "react";
import Task from "./Task";

const ToDolist = ({tasks}) => {
    return(
        <ul>
            {tasks.map((task) => (
                <Task key={task.id} task={task} />
            ))}
        </ul>

    );
};
export default ToDolist; 