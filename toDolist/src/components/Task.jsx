import React, { useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const Task = ({ task, onEdit, onDelete, theme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSaveEdit = () => {
    if (newTitle.trim()) {
      onEdit(task.id, newTitle); 
    } else {
      setNewTitle(task.title); 
    }
    setIsEditing(false);
  };

  return (
    <li
      className={theme === 'dark' ? 'dark' : 'light'}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderRadius: "5px",
        background: theme === 'dark' ? '#444' : '#fff',
        marginBottom: "8px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Mode édition ou affichage */}
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          autoFocus
          onBlur={handleSaveEdit} 
          style={{
            flex: 1,
            padding: "5px",
            fontSize: "16px",
            border: `1px solid ${theme === 'dark' ? '#666' : '#ccc'}`,
            borderRadius: "4px",
            background: theme === 'dark' ? '#555' : '#fff',
            color: theme === 'dark' ? 'white' : 'black',
          }}
        />
      ) : (
        <span style={{ flex: 1, color: theme === 'dark' ? 'white' : 'black' }}>
          {task.title}
        </span>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        {/* Bouton pour éditer ou sauvegarder */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {isEditing ? <FaCheck color="green" /> : <FaEdit color="blue" />}
        </button>
        {/* Supprimer la tâche */}
        <button
          onClick={() => onDelete(task.id)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FaTrash color="red" />
        </button>
      </div>
    </li>
  );
};

export default Task;
