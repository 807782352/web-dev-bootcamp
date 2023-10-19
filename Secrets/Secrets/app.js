//jshint esversion:6
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose, { Schema } from "mongoose";
// import encrypt from "mongoose-encryption";
// import md5 from "md5";
import bcrypt from "bcrypt";

/** Configuration */
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs"); // use to render ejs
app.use(bodyParser.urlencoded({ extended: true }));

/** MongoDB */
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new Schema({
  username: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

/** RESTful Operations */
app.listen(3000, () => console.log("Server started on port 3000."));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

/** Way4 - use Salting and Hashing to encrypt password */
const saltRounds = 10;

app.post("/register", async function (req, res) {
  const { username } = req.body;
  const plainPassword = req.body.password;
  bcrypt.hash(plainPassword, saltRounds, async function (err, hash) {
    // Store hash in your password DB.
    const newUser = new User({
      username,
      password: hash,
    });

    try {
      await newUser.save();
      console.log("Successfully setup the new account");
      res.render("secrets");
    } catch (error) {
      console.error(error);
    }
  });
});

async function findUserByName(username) {
  return await User.findOne({ username });
}

app.post("/login", async function (req, res) {
  const { username } = req.body;
  const plainPassword = req.body.password;

  const user = await findUserByName(username);

  if (!user || user.length === 0) {
    console.log("The username does not exist!");
  } else {
    bcrypt.compare(plainPassword, user.password, function (err, result) {
      if (result) {
        res.render("secrets");
        console.log("Login Successfully!");
      } else {
        console.log("Password is not correct!");
      }
    });
  }
});
