import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { authRoutes, ocrRoutes, userRoutes } from "./routes";
import { errorHandler } from "./middleware/errorHandler.middleware";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// Routes
app.use("/auth", authRoutes);
app.use("/extract", ocrRoutes);
app.use("/user", userRoutes);
// Middlewares
app.use(errorHandler);

export default app;
