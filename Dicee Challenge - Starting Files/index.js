/* Change the dice 1 */
var randomNumber1 = Math.floor(Math.random() * 6) + 1
// console.log(randomNumber1)

var src = "./images/dice" + randomNumber1 +".png";

document.querySelector(".dice > .img1").setAttribute("src", src);


/* Change the dice 2*/
var randomNumber2 = Math.floor(Math.random() * 6) + 1

src = "./images/dice" + randomNumber2 +".png";

document.querySelector(".dice > .img2").setAttribute("src", src);



/* Change the Title to display a Winner*/
if (randomNumber1 > randomNumber2){
    document.querySelector("h1").innerHTML = "&#128681 Play 1 Wins! ";
} else if (randomNumber1 < randomNumber2){
    document.querySelector("h1").innerHTML = "Play 2 Wins! 	&#128681";
} else {
    document.querySelector("h1").innerHTML = "Draw!"
}