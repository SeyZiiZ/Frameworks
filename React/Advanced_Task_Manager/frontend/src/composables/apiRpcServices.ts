import axios from "axios";

const API_URL = "http://localhost:8080/rpc"; 

export const getCurrentTime = async () => {
    try {
        const response = await axios.post(API_URL, {
            jsonrpc: "2.0",
            method: "getServerTime",
            params: [],
            id: 1
        });

        return response.data.result;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'heure du serveur :", error);
        throw error;
    }
};

export const getRandomTask = async () => {
    try {
        const response = await axios.post(API_URL, {
            jsonrpc: "2.0",
            method: "getRandomTaskSuggestion",
            params: [],
            id: 1
        });
        
        return response.data.result;
    } catch(error) {
        console.error("Erreur lors de la récupération de l'heure du serveur :", error);
        throw error;
    }
}

export const toggleTaskCompletion = async (id: string) => {
    try {
      const response = await axios.post(API_URL, {
        jsonrpc: "2.0",
        method: "toggleTaskCompletion",
        params: { id },
        id: 1
      });
  
      return response.data.result;
    } catch (error) {
      console.error("Erreur lors du toggle de la tâche :", error);
      throw error;
    }
}
