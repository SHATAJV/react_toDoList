import './App.css';
import './styles.css';

import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ToDoPage from "./components/ToDoPage";

const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <ul className="nav-link">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/todolist" className={({ isActive }) => isActive ? "active" : ""}>
              ToDo List
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<ToDoPage />} />
      </Routes>
    </div>
  );
};

export default App;
