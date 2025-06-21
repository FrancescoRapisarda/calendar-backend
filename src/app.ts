import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import weekRoutes from "./routes/weekRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/weeks", weekRoutes);

mongoose.connect(process.env.MONGO_URI!)
    .then((() => console.log("MongoDB connected")))
    .catch(err => console.error(err));

export default app;