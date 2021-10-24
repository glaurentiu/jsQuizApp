var currentQuiz = 0;
var score = 0;
var quizData = {};

var quiz = $("#quiz");
var answerEls = $(".answer");
var questionElement = $("#question");
var aText = $("#aText");
var bText = $("#bText");
var cText = $("#cText");
var dText = $("#dText");
var submitBtn = $("#submit");

$(document).ready(function () {
  $.ajax({
    url: "./quizData.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      quizData = data;
    },
  });

  setTimeout(loadQuiz, 300);

  function loadQuiz() {
    deselectAnswers();

    var currentQuizData = quizData[currentQuiz];

    questionElement.html(currentQuizData.question);
    aText.text(currentQuizData.a);
    bText.text(currentQuizData.b);
    cText.text(currentQuizData.c);
    dText.text(currentQuizData.d);
  }

  function deselectAnswers() {
    for (var i = 0; i < answerEls.length; i++) {
      answerEls[i].checked = false;
    }
  }
  function getSelected() {
    var answer;

    for (var i = 0; i < answerEls.length; i++) {
      if (answerEls[i].checked) {
        answer = answerEls[i].id;
      }
    }
    return answer;
  }
  submitBtn.on("click", function () {
    var answer = getSelected();
    console.log(answer);

    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      }
      currentQuiz++;

      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        quiz.html(`
                <h2>You answered ${score} / ${quizData.length} questions correctly </h2>

                <button onclick="location.reload()">Reload</button>
                `);
      }
    }
  });
});
