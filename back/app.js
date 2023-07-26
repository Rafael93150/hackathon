import express from "express";
import mongoose from "mongoose";
import auth from "./src/router/authRouter.js";
import messages from "./src/router/messagesRouter.js";
import calendarRouter from "./src/router/calendarRouter.js";
import users from "./src/router/userRouter.js";
import dotenv from "dotenv";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import { Server } from "socket.io";
import { connectToWebsocket } from "./src/config/websockets.js";
import { createServer } from "http";

const app = express();
dotenv.config();

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
app.use("/calendar", calendarRouter);

const server = app.get('server');
const io = new Server(server);
app.set("socketio", io);

const httpServer = createServer(app)
connectToWebsocket(httpServer)

try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to database");
} catch (e) {
    console.error(e);
}

export default app;
