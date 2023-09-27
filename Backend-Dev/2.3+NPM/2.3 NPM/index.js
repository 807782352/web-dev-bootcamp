// var generateName = require("sillyname");

import generateName from "sillyname";
import superheroes from "superheroes";

var name = generateName();
var superhero = superheroes.random();

console.log(`My name is ${name}!`);
console.log(`I want to be ${superhero}!`);