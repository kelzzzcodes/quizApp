// Example questions
const questions = [
  {
    question: 'What country is Cristiano Ronaldo from?',
    options: ['Spain', 'Brazil', 'Portugal', 'Argentina'],
    answer: 'Portugal',
  },
  {
    question:
      'Which club did Cristiano Ronaldo join in 2009 for a then world-record transfer fee?',
    options: ['Manchester United', 'Real Madrid', 'Juventus', 'Sporting CP'],
    answer: 'Real Madrid',
  },
  {
    question:
      "How many Ballon d'Or awards has Cristiano Ronaldo won (as of 2024)?",
    options: ['3', '5', '7', '8'],
    answer: '5',
  },
  {
    question:
      'Cristiano Ronaldo is the all-time top scorer for which national team?',
    options: ['Brazil', 'Spain', 'Portugal', 'Italy'],
    answer: 'Portugal',
  },
  {
    question: 'What is Cristiano Ronaldo’s famous goal celebration called?',
    options: ['Dab', 'SIU', 'Griddy', 'Samba'],
    answer: 'SIU',
  },
]

let currentQuestionIndex = 0
let score = 0
let selected = false
let userName = ''

const questionEl = document.getElementById('question')
const optionsEl = document.getElementById('options')
const nextButton = document.getElementById('nextBtn')
const scoreEl = document.getElementById('score')

const errorMessage = document.createElement('p')
errorMessage.style.color = 'red'
errorMessage.style.marginTop = '10px'
errorMessage.style.display = 'none'
nextButton.insertAdjacentElement('afterend', errorMessage)

const questionNumberEl = document.createElement('p')
questionNumberEl.style.fontWeight = 'bold'
questionNumberEl.style.marginBottom = '10px'
questionEl.insertAdjacentElement('beforebegin', questionNumberEl)

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function askUserName() {
  userName = prompt('Welcome! Please enter your name:')
  if (!userName || userName.trim() === '') {
    userName = 'Guest'
  }
}

function loadQuestion() {
  resetState()
  const currentQuestion = questions[currentQuestionIndex]

  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}/${
    questions.length
  }`
  questionEl.textContent = currentQuestion.question

  const shuffledOptions = [...currentQuestion.options]
  shuffleArray(shuffledOptions)

  shuffledOptions.forEach((optionText) => {
    const button = document.createElement('button')
    button.textContent = optionText
    button.classList.add('option-button')
    button.addEventListener('click', () => selectAnswer(button, optionText))
    optionsEl.appendChild(button)
  })
}

function resetState() {
  optionsEl.innerHTML = ''
  errorMessage.style.display = 'none'
  selected = false
}

function selectAnswer(selectedButton, selectedOption) {
  const currentQuestion = questions[currentQuestionIndex]
  const allOptions = document.querySelectorAll('.option-button')

  allOptions.forEach((button) => {
    button.disabled = true
    button.style.cursor = 'default'

    if (button.textContent === currentQuestion.answer) {
      button.classList.add('correct')
    } else if (
      button === selectedButton &&
      selectedOption !== currentQuestion.answer
    ) {
      button.classList.add('wrong')
    }
  })

  if (selectedOption === currentQuestion.answer) {
    score++
  }

  selected = true
  nextButton.style.display = 'block'
  errorMessage.style.display = 'none'
}

nextButton.addEventListener('click', () => {
  if (!selected) {
    errorMessage.textContent = 'Please select at least one option.'
    errorMessage.style.display = 'block'
    return
  }

  currentQuestionIndex++

  if (currentQuestionIndex < questions.length) {
    loadQuestion()
  } else {
    showScore()
  }
})

function showScore() {
  resetState()
  nextButton.style.display = 'none'
  questionNumberEl.style.display = 'none'
  questionEl.textContent = `Quiz Completed! 🎉`

  scoreEl.textContent = `${userName}, your score is ${score}/${questions.length}`
}

// Start Quiz
askUserName()
shuffleArray(questions)
loadQuestion()
