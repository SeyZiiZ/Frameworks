import Task, { ITask } from "../models/task";

const rpcMethods = {
  getServerTime: () => {
    return { time: new Date().toLocaleTimeString() };
  },

  getRandomTaskSuggestion: () => {
    const suggestions  = [
      "Cuisiner un nouveau plat",
      "Faire du yoga",
      "Apprendre une nouvelle langue",
      "Jouer d'un instrument",
      "Faire du jardinage",
      "Regarder un documentaire",
      "Écrire dans un journal",
      "Faire de la méditation",
      "Prendre des photos",
      "Faire du bénévolat"
    ];
    return { suggestion: suggestions[Math.floor(Math.random() * suggestions.length)] };
  },

  toggleTaskCompletion: async ({ id }: { id: string }) => {
    try {
      const task = await Task.findById(id);
      if (!task) {
        throw new Error("Tâche non trouvée");
      }

      task.completed = !task.completed;
      await task.save();

      return { id: task._id, completed: task.completed };
    } catch (error) {
      console.error("Erreur toggle task :", error);
      throw new Error("Impossible de changer l'état de la tâche.");
    }
  }
};

export default rpcMethods;