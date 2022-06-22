const express = require('express');
const mongoose = require('mongoose');

// Mongodb connect

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;
db.on("error", () => {
    console.error.bind("Database connection Error");
})

db.once("open", () => {
    console.log("Database Connected");
})


const app = express()

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

