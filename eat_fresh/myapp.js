const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
let PORT = 3500;
const cors = require("cors");
const { Schema } = mongoose;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const userSchema = require("./model/users").userSchema;
const User = require("./model/users").User;

app.use(cors());

const res = mongoose.connect(
  "mongodb+srv://eatfresh251:tW20fbGGtNbl87yS@cluster0.vhw9ubl.mongodb.net/EatFreshDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.static("Public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/signup", async (req, res) => {
  console.log("signup route", req.body);
  User.register(
    { username: req.body.email, name: req.body.name },
    req.body.password,
    function (err, user) {
      if (err) {
        res.redirect("/failedregister");
      } else {
        passport.authenticate("local", function (err, user, info) {
          if (err) {
            return res.status(401).json(err);
          }
          if (user) {
            return res.status(200).redirect("/successregister");
          } else {
            console.log(info, "9");
            res.status(401).json(info);
          }
        })(req, res);
      }
    }
  );
});

app.get("/successregister", (req, res) => {
  res.json({ message: "User registered", success: true });
});

app.get("/failedregister", (req, res) => {
  res.json({ message: "User not registered", success: false });
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
