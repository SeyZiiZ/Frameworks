import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Accueil: React.FC = () => {
  const { pseudo, setPseudo } = useUser();
  const [input, setInput] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(3);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setPseudo(input);
    }
  };

  useEffect(() => {
    if (pseudo) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            navigate("/tasks");
            return prev;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [pseudo, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-16 h-16 mx-auto bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Gérez vos tâches simplement
          </h1>
          <p className="text-lg text-gray-600">
            Pas besoin de compte. Entrez votre pseudo et commencez à organiser
            votre journée.
          </p>
        </div>

        {!pseudo ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Entrez votre pseudo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
            >
              Commencer
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Bienvenue, {pseudo} ! 🎉</h2>
            <p>Vous allez être redirigé dans <span className="text-blue-500">{countdown}</span> secondes.</p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Sans inscription
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Rapide
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Simple
          </span>
        </div>
      </div>
    </div>
  );
};

export default Accueil;