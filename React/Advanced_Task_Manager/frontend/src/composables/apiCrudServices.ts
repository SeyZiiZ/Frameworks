import axios from "axios";
const API_URL = "http://localhost:8080/api";

export interface Task {
  id?: string;
  pseudo: string;
  title: string;
  description: string;
}

export const getTasks = async (pseudo: string): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${API_URL}/tasks`, {
        params: { pseudo }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    throw error;
  }
};

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await axios.get<Task>(`${API_URL}/task`, {
      params: {id}
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la tâche ${id} :`, error);
    throw error;
  }
};

export const createTask = async (task: Task): Promise<Task> => {
  try {
    const response = await axios.post<Task>(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error);
    throw error;
  }
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put<Task>(`${API_URL}/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la tâche ${id} :`, error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression de la tâche ${id} :`, error);
    throw error;
  }
};