import React , {useState} from "react";
const AddTodoform = ({onAddTask})=> {
    const [title, setTitle]= useState("");
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        if (title.trim()==="") return; 
        onAddTask(title);
        setTitle("");
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="add new task" />
            <button type="submit">ADD</button>
        </form>
    );
};

export default AddTodoform;