const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const MongoURL = "mongodb://localhost:27017/chatserver";
const mongoose = require("mongoose");
const RouterConfig = require("./RouterConfig");
const UserRouter = require("./UserRouter");
const ChatRouter = require("./ChatRouter");

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.connect(MongoURL, {
    useMongoClient: true
});
const db = mongoose.connection;

const User = require("./User.js");
const Message = require("./Message.js");
const Room = require("./Room.js");

app.use(bodyParser.json());
app.listen(8080);
http.listen(8082);

RouterConfig.handle(app);

app.post("/user/create", UserRouter.create);
app.post("/chat/message", ChatRouter.createMessage(io));
app.post("/chat/room", ChatRouter.createRoom(io));
app.get("/chat/rooms", ChatRouter.getRooms);
app.get("/chat/messages", ChatRouter.getMessages);

io.on('connection', (socket) => {
    console.log("User connected");

    socket.on("disconnect", () => {
        socket.leave(socket.roomId);
        io.sockets.in(socket.roomId).emit("userLeft", socket.userId);
        console.log("User disconnected");
    });

    socket.on('setRoom', client => {
        console.log("User joined room", client.roomId);
        socket.userId = client._id;
        socket.roomId = client.roomId;
        socket.join(client.roomId);

        let roomClients = [];
        io.in(client.roomId).clients((err, clients) => {
            clients.forEach(client => {
                roomClients.push(io.sockets.connected[client].userId);
            })
        });

        User.find().where('_id').in(roomClients).exec((err, records) => {
            io.sockets.to(client.roomId).emit("users", records);
        });
    });

    socket.on("leaveRoom", client => {
        socket.leave(client.roomId);
        io.sockets.in(client.roomId).emit("userLeft", client.userId);
        console.log("User left room", client.roomId);
    });
});