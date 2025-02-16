import express from "express";
import { JSONRPCServer } from "json-rpc-2.0";
import rpcMethods from "../rpc/rpcMethods";

const router = express.Router();
const rpcServer = new JSONRPCServer();

Object.entries(rpcMethods).forEach(([name, func]) => rpcServer.addMethod(name, func));

router.post("/", async (req, res) => {
  const jsonRPCResponse = await rpcServer.receive(req.body);
  res.json(jsonRPCResponse);
});

export default router;