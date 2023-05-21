const express = require("express");
const public_users = express.Router();
const User = require("../model/users").User;
const passport = require("passport");

public_users.post("/signup", async (req, res) => {
  console.log("signup route", req.body);
  console.log(req.body);
  User.register(
    { username: req.body.username, name: req.body.name },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.json({ message: err.message, success: false });
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("hellosss");
          console.log(req.user);
          res.redirect("/successregister");
        });
      }
    }
  );
});

public_users.get("/successregister", (req, res) => {
  res.json({ message: "User registered", success: true });
});

module.exports.general = public_users;
