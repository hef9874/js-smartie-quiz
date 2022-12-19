var question = document.querySelector("#question");
var choices = document.querySelectorAll(".choice-text");
var progressText = document.querySelectorAll("#progressText");
var scoreText = document.querySelectorAll("#score");
var progressBarFull = document.querySelectorAll("#progressBarFull");

var currentQuestion = {}

var acceptingAnswers = true;
var score = 0; 
var questionCounter = 0; 
var availableQuestions = []

var questions = [
    {
        question: "Commonly data types do NOT inlude:",
        choice1: "Boolean",
        choice2: "String",
        choice3: "Alert",
        choice4: "Numbers",
        answer: 3,
    }
    {
        question: "Where do you place the JavaScript link in the HTML file?",
        choice1: "In the <head> section",
        choice2: "In the bottom of the <body> section",
        choice3: "Below the </html> tag",
        choice4: "In the top of the <body> section",
        answer: 2,
    }
    {
        question: "Which is NOT a way to name a variable?",
        choice1: "var",
        choice2: "const",
        choice3: "let",
        choice4: "make",
        answer: 4,
    }
]

var scorePoints = 100;
var maxQuestions = 3;

function startGame() {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    return getNewQuestion()
}

function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > maxQuestions) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`;
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question
}
