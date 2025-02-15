import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
    const { pseudo, setPseudo } = useUser();
    const navigate = useNavigate();

    const disconnect = () => {
        setPseudo("");
        localStorage.removeItem("tasksManagerUserName");
        navigate("/");
    };

    const homeTasks = () => {
        navigate("/tasks")
    }

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={disconnect}
          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Déconnexion</span>
          </div>
        </button>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div 
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium cursor-pointer"
                onClick={homeTasks}
            >
              {pseudo.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-700 font-medium">{pseudo}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
