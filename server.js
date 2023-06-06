const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

require("dotenv").config();
const app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  console.log("Connected to database");
});
