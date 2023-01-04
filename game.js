const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0; 
var questionCounter = 0; 
var availableQuestions = [];

let questions = [
    {
        question: 'Commonly used data types do NOT inlude:',
        choice1: 'Boolean',
        choice2: 'String',
        choice3: 'Alert',
        choice4: 'Numbers',
        answer: 3,
    },
    {
        question: 'Where do you place the JavaScript link in the HTML file?',
        choice1: 'In the <head> section',
        choice2: 'In the bottom of the <body> section',
        choice3: 'Below the </html> tag',
        choice4: 'In the top of the <body> section',
        answer: 2,
    },
    {
        question: 'Which is NOT a way to name a variable?',
        choice1: 'var',
        choice2: 'const',
        choice3: 'let',
        choice4: 'make',
        answer: 4,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //Which question to ask
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innertext = currentQuestion ['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

//selecting choices
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
        })
    })

    incrementScore = num => {
        score += num
        scoreText.innerText = score
    }

    startGame()