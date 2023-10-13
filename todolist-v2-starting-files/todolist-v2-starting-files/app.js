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

const itemsSchema = new mongoose.Schema({
  name: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const Item = mongoose.model("Item", itemsSchema);

const List = mongoose.model("Custom", listSchema);

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

async function initItems(defaults) {
  try {
    await Item.insertMany(defaults);
    console.log("Initialized items successfully!");
  } catch (error) {
    console.log(error);
  }
}

async function initLists(listName) {
  try {
    const list = List({
      name: listName,
      items: defaultItems,
    });

    list.save();
  } catch (error) {
    console.log(error);
  }
}

async function readListByName(name) {
  try {
    let lists = await List.findOne({ name });
    return lists;
  } catch (error) {
    console.log(error);
  }
}

async function readItems() {
  try {
    let items = await Item.find({});
    // items.forEach((item) => console.log(item.name));
    return items;
  } catch (error) {
    console.log(error);
  }
}

async function addItem(itemName) {
  const item = new Item({
    name: itemName,
  });

  try {
    // await Item.insertMany(item);
    item.save(); // 直接这么写也可以
    console.log("Add a new item successfully!");
  } catch (error) {
    console.log(error);
  }
}

async function deleteItemById(collection, id) {
  try {
    await collection.findByIdAndRemove(id);
    console.log("Delete an item successfully!");
  } catch (err) {
    console.log(err);
  }
}

app.get("/:custom", async function (req, res) {
  const customName = req.params.custom;
  console.log(customName);

  const list = await readListByName(customName);

  if (!list) {
    await initLists(customName);
    res.redirect("/" + customName);
  } else {
    // console.log(list);
    res.render("list", { listTitle: list.name, newListItems: list.items });
  }
});

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

app.post("/", async function (req, res) {
  const itemName = req.body.newItem;

  await addItem(itemName);

  res.redirect("/");
});

app.post("/delete", async function (req, res) {
  const itemId = req.body.checkbox;

  await deleteItemById(Item, itemId);

  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
