const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const methodOverride = require('method-override');

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
app.use(methodOverride("_method"))
app.set("view engine", "ejs");

// Home page

app.get("/", async (req, res) => {
    const users = await userModel.find({});
    res.render("home.ejs", { users })
})

// User creation form

app.get("/users/new", (req, res) => {
    res.render("user/userSignup.ejs")
})

// User create route

app.post("/users", async (req, res) => {
    const { firstName, lastName, email, age, password } = req.body
    user = new userModel({
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "age": age,
        "password": password,
    });
    await user.save();
    res.redirect("/");

})

// User page view
app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.render("user/userHomePage.ejs", { user });
})

// User edit form
app.get("/users/:id/edit", async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.render("user/userEditPage.ejs", { user });
})

// user edit route
app.put("/users/:id", async (req, res) => {
    const id = req.params.id
    const { firstName, lastName, email, age, password } = req.body
    const user = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "age": age,
        "password": password,
    };
    await userModel.findByIdAndUpdate(id, user)
    res.redirect("/");

})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

