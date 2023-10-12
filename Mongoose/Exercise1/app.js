// getting-started.js
import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  const url = "mongodb://127.0.0.1:27017/";

  await mongoose.connect(url + "fruitDB");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  // With Mongoose, everything is derived from a Schema.
  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please check your data entry, no name specified!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: [10, "10 is the highest rating score"],
    },
    review: String,
  });

  // The next step is compiling our schema into a Model. (前一个param是 collection的名字)
  // A model is a class with which we construct documents.
  const Fruit = mongoose.model("Fruit", fruitSchema);

  const fruit = new Fruit({
    name: "Peach",
    rating: 7,
    review: "Pretty solid as a fruit.",
  });

  //  Each document can be saved to the database by calling its save method.
  // await fruit.save();

  //   const personSchema = new mongoose.Schema({
  //     name: String,
  //     age: Number,
  //   });

  //   const Person = mongoose.model("Person", personSchema);

  //   const person = new Person({
  //     name: "John",
  //     age: 37,
  //   });

  //   person.save();

  /** 多次添加fruits */
  const orange = new Fruit({
    name: "Orange",
    rating: 4,
    review: "Too sour for me",
  });

  const banana = new Fruit({
    name: "banana",
    rating: 3,
    review: "Weird texture",
  });

  const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!!!",
  });

  //   Fruit.insertMany([kiwi, orange, banana]);

  async function findFruits() {
    try {
      const fruits = await Fruit.find({});
      console.log(fruits);

      // const fruits = await Fruit.find({ rating: { $gte: 4 } });
      //   fruits.forEach((fruit) => console.log(fruit.name));
    } catch (err) {
      console.log(err);
    } 
  }

  async function updateFruits() {
    try {
    await Fruit.updateOne({ name: "Peach" }, { rating: 6 });
      console.log("Update Successfully!");
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFruit() {
    try {
      await Fruit.deleteOne({ name: "Strawberry" });
      console.log("Delete Successfully!");
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFruits() {
    try {
      await Fruit.deleteMany({ rating: {$lt: 5} });
      console.log("Delete Successfully!");
    } catch (err) {
      console.log(err);
    }
  }

  updateFruits();
  deleteFruit();
  deleteFruits();
  findFruits();
    
  
}
