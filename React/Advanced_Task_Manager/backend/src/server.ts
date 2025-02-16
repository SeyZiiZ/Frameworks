import express from "express";
import cors from "cors";
import connectDB from "./db";
import taskRoutes from "./routes/taskRoutes";
import rpcRoutes from "./routes/rpcRoutes";
import config from "./config";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", taskRoutes);

app.use("/rpc", rpcRoutes);

app.listen(config.port, () => console.log(`🚀 Serveur lancé sur http://localhost:${config.port}`));