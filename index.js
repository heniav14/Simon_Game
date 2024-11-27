//Variable Space

var boxes = {1: "#green", 2: "#red", 3: "#yellow", 4: "#blue"};
let sequenceAnswer = [];
let userSequence = [];
var gameOn = false;
var level = 0;


//Function and Parameter Space
function newColor(){    
    let chosenNum = Math.floor(Math.random()*4) + 1;
    return boxes[chosenNum];
};

function flash(color){    
    $(color).addClass("pressed");
    let audio = new Audio("sounds/" + color.replace("#", "") + ".mp3");
    audio.play();
    setTimeout(() => {
        $(color).toggleClass("pressed");
    }, 100);
}

function gameOver(){
    
    $("#level-title").text("Game Over! Press Any Key to Restart");
    $("body").addClass("game-over");
    let audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(() => $("body").removeClass("game-over"), 200)
    resetGame();         
}

function resetGame(){
    sequenceAnswer = [];
    userSequence = []
    gameOn = false;
    level = 0;
}

function nextSequence() {
    level++;
    userSequence = [];
    $("#level-title").text("Level " + level);
    const nextColor = newColor();
    sequenceAnswer.push(nextColor);
    flash(nextColor);    
}

function checkAnswer(currentIndex) {
    if (userSequence[currentIndex] !== sequenceAnswer[currentIndex]) {
        gameOver();
        return;
    }
    if (userSequence.length === sequenceAnswer.length) {
        setTimeout(nextSequence, 1000);
    }
}

// Event Handlers
$(".btn").click(function () {
    if (!gameOn) return;
    const userColor = `#${this.id}`;
    userSequence.push(userColor);
    flash(userColor);
    checkAnswer(userSequence.length - 1);
});

$(document).keypress(function () {
    if (!gameOn) {
        gameOn = true;
        $("#level-title").text("Level 1");
        nextSequence();
    }
});


// for (let i = 1; i < 5; i++){
// $(boxes[i]).on("click", function () {
//     flash(boxes[i]);
// });
// }


// $(document).on("keypress", function(event){
//         $("#level-title").text("Level " + level);
//     });

// while (gameOn){

//     sequenceAnswer.push(newColor());
//     flash(sequenceAnswer[sequenceAnswer.length - 1])

//     for (let i = 0; i < sequenceAnswer.length; i++){
//         if ($(".btn").on("click", function(event){
//             return $(event.target).attr("id");
//             }) === sequenceAnswer[i]){
//             continue;
//         } else {
//             gameOver();      
//         }
//     }
//     level++;
//     $("#level-title").text("Level " + level);
// }