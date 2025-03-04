import React, { useState } from "react";

const AddTodoForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("basse");
  const [date, setDate] = useState("");  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    
    onAddTask(title, priority, date);

    
    setTitle("");
    setPriority("basse");
    setDate("");  
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

      {/* Champ de sélection de date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}  
      />

      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddTodoForm;

