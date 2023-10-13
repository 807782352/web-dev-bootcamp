//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const mongoURL = "mongodb://127.0.0.1:27017/";
mongoose.connect(mongoURL + "todolistDB");

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Buy Food",
});

const item2 = new Item({
  name: "Cook Food",
});

const item3 = new Item({
  name: "Eat Food",
});

const defaultItems = [item1, item2, item3];

async function initItems() {
  try {
    await Item.insertMany(defaultItems);
    console.log("Initialized items successfully!");
  } catch (error) {
    console.log(error);
  }
}

async function readItems() {
  try {
    let items = await Item.find({});
    items.forEach((item) => console.log(item));
    return items;
  } catch (error) {
    console.log(error);
  }
}

app.get("/", async function (req, res) {
  const day = date.getDate();

  const items = await readItems();
  if (items.length === 0) {
    initItems();
    res.redirect("/");
  } else {
    res.render("list", { listTitle: day, newListItems: items });
  }
});

app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});