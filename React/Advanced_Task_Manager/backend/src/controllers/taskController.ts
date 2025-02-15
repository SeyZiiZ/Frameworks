import { Request, Response } from "express";
import Task, { ITask } from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { pseudo } = req.query;

        let tasks;
        if (pseudo) {
            tasks = await Task.find({ pseudo });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des taches", error });
    }
};


export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        let task;
        if(id) {
            task = await Task.findById(id);
        }
        
        res.status(200).json(task);
    } catch(error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la tache", error });
    } 
}

export const createTask = async (req: Request, res: Response) => {
    const {  pseudo ,title, description } = req.body;
    const newTask: ITask = new Task({ pseudo, title, description });
    await newTask.save();
    res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({Message: "Tache supprimer avec succes"});
    } catch(error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la tache", error });
    }
};