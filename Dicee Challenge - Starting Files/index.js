var randomNumber1 = Math.floor(Math.random() * 6) + 1
// console.log(randomNumber1)

var src = "./images/dice" + randomNumber1 +".png";

document.querySelector(".dice > .img1").setAttribute("src", src);