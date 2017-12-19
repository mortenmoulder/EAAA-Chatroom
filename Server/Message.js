const mongoose = require("mongoose");

module.exports = mongoose.model("Message", {
    message: String,
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: Date
});