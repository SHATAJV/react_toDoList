import React, { useState } from "react";

const AddTodoform = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("basse");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    
    onAddTask(title, priority);

   
    setTitle("");
    setPriority("basse"); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ajoutez une nouvelle tâche"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)} 
      >
        <option value="basse">Basse</option>
        <option value="moyenne">Moyenne</option>
        <option value="haute">Haute</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddTodoform;
