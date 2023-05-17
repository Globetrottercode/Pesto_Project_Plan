const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let PORT = 3500;
const cors = require("cors");
const { Schema } = mongoose;

app.use(cors());

const res = mongoose.connect(
  "mongodb+srv://eatfresh251:tW20fbGGtNbl87yS@cluster0.vhw9ubl.mongodb.net/EatFreshDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const userSchema = mongoose.Schema({
  email: String,
  name: String,
  password: String,
});
const User = mongoose.model("user", userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  console.log("signup route", req.body);
  let { email, name, password } = req.body;
  const user = new User({
    email: email,
    name: name,
    password: password,
  });
  let response = await user.save();
  console.log(response);
  if (response._id) res.json({ message: "User registered" });
  else res.json({ message: "Error ocuured" });
});

app.post("/login", (req, res) => {
  console.log("login route", req.body);
  let data = req.body;
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server connected at port ${PORT}`);
});

// npx express-generator --views=ejs eat_fresh
