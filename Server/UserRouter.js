const User = require("./User.js");

exports.create = (req, response) => {
    const user = req.body;
    User.findOne(user, (err, foundUser) => {
        if (foundUser) {
            response.status(200).send(foundUser);
        } else {
            new User(user).save((err, user) => {
                response.status(200).send(user);
            });
        }
    });
};