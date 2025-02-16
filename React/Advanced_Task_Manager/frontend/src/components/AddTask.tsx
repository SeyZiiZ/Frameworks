import React, { useState } from "react";
import { createTask } from "../composables/apiCrudServices";
import { getCurrentTime, getRandomTask } from "../composables/apiRpcServices";

interface Task {
  pseudo: string;
  title: string;
  description: string;
}

interface AddTaskComponentProps {
  pseudoProp: string;
  onTaskAdded?: (task: Task) => void;
}

const AddTaskComponent: React.FC<AddTaskComponentProps> = ({
  pseudoProp,
  onTaskAdded,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newTask = await createTask({
        pseudo: pseudoProp,
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");

      onTaskAdded?.(newTask);
    } catch (err) {
      setError("Erreur lors de l'ajout de la tâche.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIdee = async () => {
    const { suggestion } = await getRandomTask();
    setTitle(suggestion);
  };

  const getHeure = async () => {
    const { time } = await getCurrentTime();
    setDescription(time);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Nouvelle tâche</h2>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Titre
          </label>
          <div className="flex space-x-2">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Que devez-vous faire ?"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <button
              onClick={getIdee}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              Générer une idée
            </button>
            <button
              onClick={getHeure}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              Heure actuelle
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ajoutez plus de détails..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setDescription("");
            }}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-color cursor-pointer"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!title.trim() || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Ajout..." : "Ajouter la tâche"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskComponent;
