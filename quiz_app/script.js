//DOM elements 
const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")
const startBtn = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const answerContainer = document.getElementById("answer-container")
const currentQuestionSpan = document.getElementById("current-question")
const totalQuestionSpan = document.getElementById("total-question")
const scoreSpan = document.getElementById("score")
const progressBar = document.getElementById("progress")
const finalScoreSpan = document.getElementById("final-score")
const maxScoreSpan = document.getElementById("max-score")
const resultMessage = document.getElementById("result-message")
const restartBtn = document.getElementById("restart-btn")

//quiz array
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
]


//quiz state vars
let currentQuestionIndex = 0
let score = 0
let answerDisabled = false

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", resetQuiz);

function startQuiz(){
    //reset vars
    currentQuestionIndex=0;
    score = 0;
    scoreSpan.textContent = 0;
    
    //switch screens 
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQues()

}

function showQues(){
    //reset state
    answerDisabled= false;

    const currentQues = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex+1
    const progressPercent = (currentQuestionIndex/quizQuestions.length) * 100
    progressBar.style.width = progressPercent + "%"
    questionText.textContent = currentQues.question

    answerContainer.innerHTML = "";

    currentQues.answers.forEach(answer => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("answer-btn") //css class for styling 

      //Store correct/wrong info secretly on the button

      //dataset lets you attach hidden custom data to any HTML element. This stores true or false directly on the button, so when it's clicked, you can check button.dataset.correct to know if the answer was right — without touching the original array again.
      button.dataset.correct= answer.correct;
      button.addEventListener("click", selectAnswer)

      //Add button to the page
      //Inserts the fully built button into the DOM so the user can actually see and click it.
      answerContainer.appendChild(button)
    })
}

function selectAnswer(event){
    //optimization check
    if(answerDisabled) return
    answerDisabled = true
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"
    //Note: dataset always returns a string, so it compares against "true" not true

    //array.from()is used to convert the NodeList returned by answercontainer.children into an array, this is because nodelist is not an array and we need to use the forEach method
    Array.from(answerContainer.children).forEach(button => {
      if(button.dataset.correct === "true")
      {
        button.classList.add("correct")
      }
      else{
        button.classList.add("incorrect")
      }
    }) 

    if(isCorrect)
    {
      score++;
      scoreSpan.textContent = score;

    }

    setTimeout(() => {
      currentQuestionIndex++;

      //check if there are more ques or not 
      if(currentQuestionIndex < quizQuestions.length)
      { 
        showQues()
      }
      else{
        showResults()
      }
    },1000)
}

function showResults(){
  //switch screens
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent = score
  const percentage = (score/quizQuestions.length)*100
  if(percentage===100)
  {
    resultMessage.textContent = "perfect!"
  }else if(percentage>=80){
    resultMessage.textContent= "great job!"
  }else if(percentage>=60){
    resultMessage.textContent = "good efforts!"
  }else if(percentage>=40){
    resultMessage.textContent = "not bad!"
  }else{
    resultMessage.textContent="keep studying! you'll get better"
  }
}

function resetQuiz(){
    resultScreen.classList.remove("active")
    startQuiz()
}



