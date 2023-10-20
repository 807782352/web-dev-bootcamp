//jshint esversion:6
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose, { Schema } from "mongoose";

// Way 5 - Using Passport.js to add cookies and sessions
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";

/** Configuration */
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs"); // use to render ejs
app.use(bodyParser.urlencoded({ extended: true }));

/** 新增配置 */
app.use(
  session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/** MongoDB */
mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new Schema({
  username: String,
  password: String,
});


/** 新增配置 */
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

/** 简化passport中serialize和deserialize配置 */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

/** 新增部分！ */
app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
});

app.get("/logout", function (req, res) {
  req.logOut(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

async function findUserByName(username) {
  return await User.findOne({ username });
}

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});
