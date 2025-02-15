import React, { useEffect, useState } from "react";
import { deleteTask } from '../composables/apiCrudServices'
import { toggleTaskCompletion } from '../composables/apiRpcServices'

interface Task {
  _id: string;
  title: string;
  description: string;
  pseudo: string;
  completed: boolean;
}

interface TaskComponentProps {
  data: { data: Task[] };
  onTaskDeleted: (id: string) => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ data, onTaskDeleted }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      setTasks(data.data);
    } else {
      console.error("Données incorrectes : `data.data` n'est pas un tableau.");
    }
  }, [data]);

  async function handleDelete(idTask: string) {
    try {
      await deleteTask(idTask);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== idTask));

      onTaskDeleted(idTask);
    } catch (error) {
      console.error(`Erreur lors de la suppression de la tâche ${idTask} :`, error);
    }
  }

  async function handleToggleCompletion(idTask: string) {
    try {
      const updatedTask = await toggleTaskCompletion(idTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask.id ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (error) {
      console.error(`Erreur lors du toggle de la tâche ${idTask} :`, error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleCompletion(task._id)}
                        className="w-5 h-5 rounded-full border-2 border-blue-500 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 transition-all cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <h2
                        className={`text-lg font-semibold ${
                          task.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </h2>
                      <p
                        className={`text-sm ${
                          task.completed ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {task._id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-blue-50 transition-all cursor-pointer">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all cursor-pointer"
                        onClick={() => handleDelete(task._id)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
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
      )}
    </div>
  );
};

export default TaskComponent;
