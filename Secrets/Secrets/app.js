//jshint esversion:6
import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose, { Schema } from "mongoose";
import encrypt from "mongoose-encryption";

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

// Way 2 - Encryption in the field of "password" & use environment variables
console.log(process.env.API_TEST_KEY);

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

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

/** Username and  Password only */
app.post("/register", async function (req, res) {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });

  try {
    await newUser.save();
    console.log("Successfully setup the new account");
    res.render("secrets");
  } catch (error) {
    console.error(error);
  }
});

async function findUserByName(username) {
  return await User.findOne({ username });
}

app.post("/login", async function (req, res) {
  const { username, password } = req.body;

  const user = await findUserByName(username);

  if (!user || user.length === 0) {
    console.log("The username does not exist!");
  } else if (user.password === password) {
    res.render("secrets");
    console.log("Login Successfully!");
  } else {
    console.log("The password does not correct!");
  }
});
