const Task = ({ task, onToggle, onDelete }) => {
    return (
        <li
            onClick={() => onToggle(task.id)}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
            {task.title}
            <button onClick={(e) => {
                e.stopPropagation(); 
                onDelete(task.id);
            }} style={{ color: "red" }}>
                X
            </button>
        </li>
    );
};

export default Task;
