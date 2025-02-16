import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import AddTaskComponent from "../components/AddTask";
import { getTaskById, getTasks, Task } from "../composables/apiCrudServices";
import TaskComponent from "../components/TaskComponent";
import NoTasks from "../components/NoTasks";

const TaskManager: React.FC = () => {
    const { pseudo } = useUser();
    const { taskId } = useParams();
    const [toggleViewTasks, setToggleViewTasks] = useState<boolean>(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                if(taskId) {
                    const task = await getTaskById(taskId, pseudo);
                    setTasks(task ? [task] : []);
                } else {
                    const userTasks = await getTasks(pseudo);
                    setTasks(userTasks);
                }
            } catch (err) {
                setError("Impossible de récupérer les tâches.");
                console.log(err)
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [pseudo, taskId]);

    function handleTaskDeleted(id: string) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    }

    const handleTaskAdded = (newTask: Task) => {
        setTasks([...tasks, newTask]);
        setToggleViewTasks(true);
    };

    const switchView = () => {
        setToggleViewTasks(!toggleViewTasks);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <NavBar />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Mes tâches</h1>
                    <button
                        onClick={switchView}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>{toggleViewTasks ? "Nouvelle tâche" : "Afficher les tâches"}</span>
                    </button>
                </div>

                {/* logique affichage des taches ou formulaire */}
                {toggleViewTasks ? (
                    <>
                        {loading ? (
                            <p className="text-gray-500 text-center">Chargement des tâches...</p>
                        ) : error ? (
                            <p className="text-red-500 text-center">{error}</p>
                        ) : tasks.length > 0 ? (
                            <TaskComponent data={{ data: tasks }} onTaskDeleted={handleTaskDeleted} />
                        ) : (
                            <NoTasks />
                        )}
                    </>
                ) : (
                    <AddTaskComponent pseudoProp={pseudo} onTaskAdded={handleTaskAdded} />
                )}
            </main>
        </div>
    );
};

export default TaskManager;