const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

require("dotenv").config();
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mydb").then(() => {
  console.log("connected successfully");
});

app.get("/users", (req, res) => {
  // Get all users from the database
  const users = User.find();

  res.json(users);
});

// Create a POST route to add a new user to the database

app.post("/users", (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    favoriteBooks: req.body.favoriteBooks,
  });
  user.save((err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

// Create a PUT route to edit a user by ID

app.put("users/:id", (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    res.send(404);
  } else {
    user.name = req.body.name;
    user.age = req.body.age;
    user.favoriteBooks = req.body.favoriteBooks;

    user.save((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }
});

// Create a DELETE route to remove a user by ID
app.delete("/users/:id", (req, res) => {
  const user = User.findById(req.params.id);

  if (!user) {
    res.send(404);
  } else {
    user.remove((err) => {
      if (err) {
        res.send(err);
      } else {
        res.sendStatus(200);
      }
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
