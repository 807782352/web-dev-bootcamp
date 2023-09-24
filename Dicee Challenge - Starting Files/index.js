/* Change the dice 1 */
var randomNumber1 = Math.floor(Math.random() * 6) + 1
// console.log(randomNumber1)

var src = "./images/dice" + randomNumber1 +".png";

document.querySelector(".dice > .img1").setAttribute("src", src);


/* Change the dice 2*/
var randomNumber2 = Math.floor(Math.random() * 6) + 1

src = "./images/dice" + randomNumber2 +".png";

document.querySelector(".dice > .img2").setAttribute("src", src);