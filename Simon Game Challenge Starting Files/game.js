const gamePattern = [];

var level = 0;

var started = false;

var userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").on("click", function(){
    // console.log(this);
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    // console.log(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
    // initialization
    if (!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            // meaning this level is done successfully
            setTimeout(()=>{
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
    }
}

function nextSequence() {
    // everrytime the function is triggered, need to reset the userClickedPattern
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4); // 0 ~ 3
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var music = new Audio("./sounds/"+name+".mp3");
    music.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}