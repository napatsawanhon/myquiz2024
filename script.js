const questions = [
    {
        question: "หน่วยงาน GoSoft มีหลัก 4 Attributes ประกอบด้วยอะไรบ้าง",
        answers: [
            { text: "Prudence, Justice, Fortitude, Temperance", correct: false},
            { text: "Empathy, Upbeat, Do-ocracy, Lifelong learner", correct: true},
            { text: "Empathy, Upbeat, Justice, Temperance", correct: false},
            { text: "Connection, Teamwork, Upbeat, Do-ocracy", correct: false},
        ]
    },
    {
        question: "Empathy หมายถึงอะไร",
        answers: [
            { text: "มุ่งมั่นฝ่าฟันอุปสรรค", correct: false},
            { text: "ลงมือทำดั่งเจ้าของ", correct: false},
            { text: "ใฝ่รู้ใฝ่เรียน", correct: false},
            { text: "มีความเข้าใจเข้าใจผู้อื่น", correct: true},
        ]
    },
    {
        question: "Upbeat หมายถึงอะไร",
        answers: [
            { text: "มีความเข้าใจเข้าใจผู้อื่น", correct: false},
            { text: "ลงมือทำดั่งเจ้าของ", correct: false},
            { text: "มุ่งมั่นฝ่าฟันอุปสรรค", correct: true},
            { text: "ใฝ่รู้ใฝ่เรียน", correct: false},
        ]
    },
    {
        question: "Do-ocracy หมายถึงอะไร",
        answers: [
            { text: "ลงมือทำดั่งเจ้าของ", correct: true},
            { text: "ใฝ่รู้ใฝ่เรียน", correct: false},
            { text: "มีความเข้าใจเข้าใจผู้อื่น", correct: false},
            { text: "มุ่งมั่นฝ่าฟันอุปสรรค", correct: false},
        ]
    },
    {
        question: "Lifelong learner หมายถึงอะไร",
        answers: [
            { text: "มุ่งมั่นฝ่าฟันอุปสรรค", correct: false},
            { text: "ใฝ่รู้ใฝ่เรียน", correct: true},
            { text: "ลงมือทำดั่งเจ้าของ", correct: false},
            { text: "มีความเข้าใจเข้าใจผู้อื่น", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "ถัดไป";
    showQuestion()
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button =>{
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = "คะแนนของคุณ : " + score + " / " + questions.length;
    nextButton.innerHTML = "เล่นอีกครั้ง"
    nextButton.style.display = "block"
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})



startQuiz();