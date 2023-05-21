const express = require("express");
const regd_users = express.Router();
const passport = require("passport");
const User = require("../model/users").User;

regd_users.post("/login", async (req, res) => {
  console.log("login route", req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/customer/failedlogin");
    } else {
      console.log("hel");
      passport.authenticate("local")(req, res, function () {
        res.redirect("/customer/successlogin");
      });
    }
  });
});

regd_users.get("/successlogin", async (req, res) => {
  console.log("reached");
  res.status(200).json({ message: "User logged in", success: true });
});

regd_users.get("/failedlogin", async (req, res) => {
  console.log("not reached");
  res.status(401).json({ message: "User log in failed", success: false });
});

module.exports.authenticated = regd_users;
