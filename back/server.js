import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import Message from "./src/models/message.js";
import User from "./src/models/user.js";

const PORT = process.env.PORT || 3000;
app.set("port", PORT);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("newMessage", async (messageData) => {
        try {
            const { fromUser, toUser, text, images, files } = messageData;
            
            const newMessage = new Message({
              fromUser,
              toUser,
              text,
              images,
              files,
            });
        
            const savedMessage = await newMessage.save();
        
            const populatedMessage = await Message.findById(savedMessage._id).populate(
              "fromUser",
              "firstname lastname picture"
            );
        
            io.emit("newMessage", populatedMessage);
          } catch (err) {
            console.error(err);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

app.set("socketio", io);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
