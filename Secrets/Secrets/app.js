//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');  // use to render ejs
app.use(bodyParser.urlencoded({ extended: true }));

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
