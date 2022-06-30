const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: "String",
    lastName: "String",
    email: "String",
    age: {
        "type": "Number",
        "min": 0,
        "max": 125
    },
    password: "String"
});

module.exports = mongoose.model("User", userSchema);