const gamePattern = [];

const userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4); // 0 ~ 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    var music = new Audio("./sounds/"+randomChosenColour+".mp3");
    music.play();
}

$(".btn").on("click", function(){
    // 哪个btn被点击，这个this就指向哪个btn 元素
    // console.log(this);
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
})
