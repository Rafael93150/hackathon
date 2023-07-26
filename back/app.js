import express from "express";
import mongoose from "mongoose";
import auth from "./src/router/authRouter.js";
import messages from "./src/router/messagesRouter.js";
import calendarRouter from './src/router/calendarRouter.js';
import trainingRouter from './src/router/trainingRouter.js';
import companiesRouter from './src/router/companyRouter.js';
import users from "./src/router/userRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import http from 'http';
import { Server } from 'socket.io';

const app = express();
dotenv.config();
app.use(cors());


app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use("/auth", auth);
app.use("/messages", authMiddleware, messages);
app.use("/users", authMiddleware, users);
app.use('/calendar', authMiddleware, calendarRouter);
app.use('/training', authMiddleware, trainingRouter);
app.use('/companies', authMiddleware, companiesRouter);

const server = http.createServer(app);
const io = new Server(server);
app.set('socketio', io);

try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
} catch (e) {
    console.error(e);
}

export default app;
