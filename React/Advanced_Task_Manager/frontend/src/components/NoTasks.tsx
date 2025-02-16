import React from "react";

const NoTasks: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="flex flex-col items-center space-y-3">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-gray-500 text-lg">Aucune tâche disponible</p>
          <p className="text-gray-400 text-sm">
            Commencez par créer une nouvelle tâche
          </p>
        </div>
      </div>
    )
}

export default NoTasks;