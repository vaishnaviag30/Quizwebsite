const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Tony Stark",
        correct: "b"
    },
    {
        question: "What is the largest planet in our solar system?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "c"
    },
    {
        question: "What is the boiling point of water?",
        a: "50°C",
        b: "100°C",
        c: "150°C",
        d: "200°C",
        correct: "b"
    }
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("startQuiz");
const timerEl = document.getElementById("time");

let currentQuiz = 0;
let score = 0;
let timer;

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    startTimer();
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function startTimer() {
    let timeLeft = 30;
    timerEl.innerText = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

function showCorrectAnswer() {
    const selectedAnswer = getSelected();
    const correctAnswer = quizData[currentQuiz].correct;

    if (selectedAnswer && selectedAnswer !== correctAnswer) {
        alert(`Incorrect! The correct answer was: ${correctAnswer}`);
    } else if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly</h2>
            <button onclick="location.reload()">Reload</button>
        `;
    }
}

submitBtn.addEventListener("click", () => {
    clearInterval(timer);
    showCorrectAnswer();
});

startBtn.addEventListener("click", () => {
    document.getElementById("rules").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuiz();
});
