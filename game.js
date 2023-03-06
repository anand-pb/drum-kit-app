// alert("hey playa'");

var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$("body").keypress(function () {
    if(!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

function nextSequence () {
    level++;
    $("#level-title").text("Level " + level);

    var factor = Math.random();
    var maxRange = 3;
    var randomNumber = Math.round(factor * maxRange);
    
    var randomChosenColour = buttonColours[randomNumber];
    // console.log(randomChosenColour);
    gamePattern.push(randomChosenColour);

    // console.log($("#" + randomChosenColour + ""));

    $("#" + randomChosenColour + "").fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // return randomNumber;
}

// console.log($("button"));
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern.length);
    checkAnswer(userClickedPattern.length - 1);
});

// console.log(userClickedPattern);

// $(".btn").click(function () {

// });

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour + "").addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour + "").removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel) {

    // console.log(gamePattern);
    // console.log(userClickedPattern);

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        // console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false; 
}