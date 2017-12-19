const mongoose = require("mongoose");

module.exports = mongoose.model("Room", {
    name: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created: Date
});