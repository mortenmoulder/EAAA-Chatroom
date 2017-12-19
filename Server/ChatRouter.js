const User = require("./User.js");
const Message = require("./Message.js");
const Room = require("./Room.js");

exports.createMessage = (io) => {
    return (req, response) => {
        req.body.date = new Date();
        new Message(req.body).save((err, message) => {
            Message.populate(message, { path: "sentBy" }, (err, message) => {
                Message.populate(message, { path: "room" }, (err, message) => {
                    io.sockets.to(message.room._id).emit("newMessage", message);
                    response.status(200).send(message);
                });
            });
        });
    };
}

exports.createRoom = (io) => {
    return (req, response) => {
        const roomName = req.body.name;
        Room.find({ name: roomName }, (err, foundRoom) => {
            if (foundRoom.length > 0) {
                response.status(200).send({});
            } else {
                req.body.created = new Date();
                new Room(req.body).save((err, room) => {
                    Room.populate(room, { path: "createdBy" }, (err, room) => {
                        io.emit("newRoom", room);
                        response.status(200).send(room);
                    })
                });
            }
        });
    }
}

exports.getRooms = (req, response) => {
    Room.find({}, (err, rooms) => {
        response.status(200).send(rooms);
    });
};

exports.getMessages = (req, response) => {
    const ObjectId = require('mongoose').Types.ObjectId;
    Message.find({ room: new ObjectId(req.query._id) }).populate("sentBy").populate("room").exec((err, messages) => {
        response.status(200).send(messages);
    });
};