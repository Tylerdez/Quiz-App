//question database
const STORE = [
  {
    question: 'This layer also permits the transmission of data to the next layer, where it is addressed and routed.?',
    answers: [
      'Presentation',
      'Transport',
      'Physical',
      'Session',
      'Network',
      'Application',
      'Data-Link'
    ],
    correctAnswer:
      'Data-Link'
  },
  {
    question:
      'What layer sets up, coordinates and terminates conversations between applications?',
    answers: [
      'Presentation',
      'Transport',
      'Physical',
      'Session',
      'Network',
      'Application',
      'Data-Link'
    ],
    correctAnswer:
      'Session'
  },
  {
    question:
      'What layer enables the user (human or software) to interact with the application?',
    answers: [
      'Presentation',
      'Transport',
      'Physical',
      'Session',
      'Network',
      'Application',
      'Data-Link'
    ],
    correctAnswer: 'Application'
  },
  {
    question: 'What layer transports data using electrical, mechanical or procedural interfaces?',
    answers: [
      'Presentation',
      'Transport',
      'Physical',
      'Session',
      'Network',
      'Application',
      'Data-Link'
    ],
    correctAnswer: 'Physical'
  },
  {
    question:
      'What layer packages data with correct network address information, selecting the appropriate network routes?',
    answers: [
      'Presentation',
      'Transport',
      'Physical',
      'Session',
      'Network',
      'Application',
      'Data-Link'
    ],
    correctAnswer:
      'Network'
  },
  {
    question: 'What layer translates or formats data?',
    answers: [
      'Presentation',
      'Transport',
      'Physical',
      'Session',
      'Network',
      'Application',
      'Data-Link'
    ],
    correctAnswer: 'Presentation'
  },
  {
    question:
      'What layer is responsible for transferring data, error-checking, and data flow controls?',
    answers: [
      'Presentation',
      'Transport',
      'Physical',
      'Session',
      'Network',
      'Application',
      'Data-Link'
    ],
    correctAnswer:
      'Transport'
  }
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(7);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.informationBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(
  `<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`
  )
  //finds fieldset in formMaker variable above and assigns the fieldset to variable fieldSelector
  let fieldSelector = $(formMaker).find('fieldset');
  //appends answer choices to question
  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>That is correct!</h3>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer</h3>\n
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.informationBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job!',
  ];

  const good = [
    'Good, not great.',
  ];

  const bad = [
    'This is not a great score.',
  ];

  if (score >= 8) {
    array = great;
  } else if (score < 8 && score >= 5) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
        <h3>Your score is ${score} / 7</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.informationBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
