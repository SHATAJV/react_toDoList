const Task = ({task, onToggle}) => {
    return (
        <li onClick={() => onToggle(task.id)} style={{textDecoration : task.completed ? 'line-through': 'none'}} >{task.title}</li>
    );
};

export default Task;