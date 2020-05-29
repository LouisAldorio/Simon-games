//global variables
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"]
var level = 0;
var start = false;

//functions
function nextSequence(){
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    level+=1;
}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100)
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
                $("h1").html("level "+level)
                $(".score").html(level)
            },1000)
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200)
        $("#level-title").html("Game Over, click start to play again!");
        var best = $(".best").html()
        var score = $(".score").html()
        if(best<score){
            $(".best").html(score)
        }
        $(".score").html("0")
        startOver();

    }
}
function startOver(){
    start = false;
    gamePattern = [];
    level = 0;
}



//main
$("#start").on("click",function(){
    if(!start){
        start = true;
        nextSequence();
        $("#level-title").html("level "+level)
        $(".score").html(level)
    }
})
$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1);
})

//guide
$("#guide").on("click",function () {
    $(".bg-modal").fadeIn()
})
$(".close").on("click",function () {
    $(".bg-modal").fadeOut()
})



