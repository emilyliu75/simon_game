var buttonColours = [ "red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0

$(document).on("keypress", function(){
    if(!started) {
        $("h1").text("Level " + level)
        nextSequence()
        started = true   
    }
})

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)
    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        console.log("index" + index + "correct!!");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    } else {

        console.log("wrong")
        playSound("wrong")
        $("h1").addClass("game-over")
        setTimeout(function(){
            $("h1").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function nextSequence() {
    userClickedPattern = []
    level ++
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChoseColour = buttonColours[randomNumber]
    gamePattern.push(randomChoseColour)

    $("#" + randomChoseColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColour)
    console.log("game pattern: " + gamePattern)

}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3")
    sound.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false
}






