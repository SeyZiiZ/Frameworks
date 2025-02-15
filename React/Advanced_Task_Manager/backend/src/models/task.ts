import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
    pseudo: string;
    title: string;
    description: string;
    completed: boolean;
}

const TaskSchema: Schema = new Schema({
    pseudo: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false }
});

export default mongoose.model<ITask>("Task", TaskSchema);