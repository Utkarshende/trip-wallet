// app.js

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
import walletRoutes from "./routes/wallet.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/wallet", walletRoutes);

export default app;