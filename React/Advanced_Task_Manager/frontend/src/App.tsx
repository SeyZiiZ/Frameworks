import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Accueil from "./views/Accueil";
import Tasks from "./views/TaskManager";
import UpdateTask from "./components/UpdateTask";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Accueil" />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Tasks/:taskId" element={<Tasks />} />
      </Routes>
    </Router>
  );
};

export default App
