const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/user');

// Mongodb connect

mongoose.connect("mongodb://localhost:27017/testVidStream");

const db = mongoose.connection;
db.on("error", () => {
    console.error.bind("Database connection Error");
})

db.once("open", () => {
    console.log("Database Connected");
})


const app = express();

app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/users/new", (req, res) => {
    res.render("user/userSignup.ejs")
})

app.post("/users", async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body
    user = new userModel({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "age": age,
        "password": password,
        "videos": []
    });
    await user.save();
    res.redirect("/");

})


app.listen(3000, () => {
    console.log("Server started on port 3000");
})

