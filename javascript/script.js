// need a start button that will start the timer and quiz once clicked... timer is at 75 seconds for 5 questions 
// presented with a question and 3 answer choices
// if answered incorrectly, time will be subtracted from timer
// once timer is at 0 or all questions are answered the game is over
// when the game is over, user saves initials and score to leaderboard
// need to declare all the variables that will be needed for this quiz

//Global variables
var i = 0;
var score = 0;
var secondsLeft = 60;
var clock = document.querySelector("#time-display");
var messageDiv = document.querySelector("#message");
var storedScores;
var scoreList = [];
var choiceOne = document.getElementById("choiceOne");
var choiceTwo = document.getElementById("choiceTwo");
var choiceThree = document.getElementById("choiceThree");


function setClock() {
    var clockInterval = setInterval(function () {
        secondsLeft--;
        clock.textContent = "Clock: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(clockInterval);
            alert("Out of Time");
            questionEnder();
        }

        else if (i === questions.length) {
            clearInterval(clockInterval);
        }
    }, 1000)
    return (score)
}
function questionEnder() {

    var scoreTag = document.createElement("h1");
    var inputTag = document.createElement("input");
    var submitButton = document.createElement("button");
    score += secondsLeft * .1;
    score = score.toFixed(2);
    document.getElementById("question").textContent = "All Done!";
    choiceOne.remove();
    choiceTwo.remove();
    choiceThree.remove();
    document.body.children[1].appendChild(scoreTag);
    document.getElementsByTagName("h1")[0].setAttribute("id", "score");
    document.getElementById("score").textContent = "Your Score: " + score;
    document.body.children[1].appendChild(inputTag);
    document.getElementsByTagName("input")[0].setAttribute("id", "input-field");
    submitButton.textContent = "Submit";
    document.body.children[1].appendChild(submitButton);
    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        var highScoreText = new Object();
        highScoreText.name = inputTag.value.trim();
        highScoreText.newScore = score;
        storeScores(highScoreText);
        window.location.href = "highScores.html";
    });
}
function questionSetter() {

    choiceOne.hidden = false;
    choiceTwo.hidden = false;
    choiceThree.hidden = false;

    document.getElementById("start-btn").hidden = true;
    if (i === questions.length) {
        questionEnder();
    }
    else {
        document.getElementById("question").textContent = questions[i]["title"];
        document.getElementById("choiceOne").textContent = questions[i]["choices"][0];
        document.getElementById("choiceTwo").textContent = questions[i]["choices"][1];
        document.getElementById("choiceThree").textContent = questions[i]["choices"][2];
    }
}

function storeScores(highScoreText) {
    tempArray = JSON.parse(localStorage.getItem("scores"));
    if (tempArray === null) {
        scoreList.push(highScoreText);
        localStorage.setItem("scores", JSON.stringify(scoreList));
    }
    else {
        tempArray.push(highScoreText);
        localStorage.setItem("scores", JSON.stringify(tempArray));
    }
}

document.getElementById("start-btn").addEventListener("click", questionSetter);
document.getElementById("start-btn").addEventListener("click", setClock);
document.getElementById("start-btn").addEventListener("click", function () {
    messageDiv.textContent = "";
});

choiceOne.hidden = true;
choiceTwo.hidden = true;
choiceThree.hidden = true;

document.getElementById("choiceOne").addEventListener("click", function () {
    if (questions[i]["choices"][0] === questions[i]["answer"]) {
        messageDiv.textContent = "Correct!";
        score++;
    }
    else {
        messageDiv.textContent = "Wrong!";
        secondsLeft -= 10;
    }
    i++;
    questionSetter();
})

document.getElementById("choiceTwo").addEventListener("click", function () {
    if (questions[i]["choices"][1] === questions[i]["answer"]) {
        messageDiv.textContent = "Correct!";
        score++;
    }
    else {
        messageDiv.textContent = "Wrong!";
        secondsLeft -= 10;
    }
    i++;
    questionSetter();
})

document.getElementById("choiceThree").addEventListener("click", function () {
    if (questions[i]["choices"][2] === questions[i]["answer"]) {
        messageDiv.textContent = "Correct!";
        score++;
    }
    else {
        messageDiv.textContent = "Wrong!";
        secondsLeft -= 10;
    }
    i++;
    questionSetter();
})

