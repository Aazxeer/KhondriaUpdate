var quizData = [
    { question: "1. The arrangement of visual elements on the screen.", options: ["Layout", "Color", "Alignment", "Audience"], correct: "Layout", type: "mcq" },
    { question: "2. It is the process of creating products or services that provide meaningful experiences for users.", options: ["Color Theory", "User Interface Design", "Typography", "User Experience Design"], correct: "User Experience Design", type: "mcq" },
    { question: "3. This is the art and science of creating the right palette for your website.", options: ["Typography", "User Experience Design", "Color Theory", "User Interface Design"], correct: "Color Theory", type: "mcq" },
    { question: "4. It is responsible for a product's appearance, interactivity, usability, behavior, and overall feel.", options: ["User Experience Design", "Typography", "User Interface Design", "Color Theory"], correct: "User Interface Design", type: "mcq" },
    { question: "5. The art and technique of arranging typography to make written language legible, readable, and appealing when displayed.", options: ["Typography", "Color Theory", "User Interface Design", "User Experience Design"], correct: "Typography", type: "mcq" },
    { question: "6. It's a tool that helps align content along a one-dimensional axis.", correct: ["flexbox", "Flexbox"], type: "numeration" },
    { question: "7. It is a tool for laying out content along two dimensions.", correct: ["Grid", "grid"], type: "numeration" },
    { question: "8. In what type of Flexbox can you find the row & column layouts?", correct: ["Flex Direction", "flex direction"], type: "numeration" },
    { question: "9. The arrangement of visual elements on the screen.", correct: ["Layout", "layout"], type: "numeration" },
    { question: "10. What is used to align the box?", correct: ["flexbox", "Flexbox"], type: "numeration" }
];

var currentQuestion = 0;
var score = 0;

var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var numerationInput = document.getElementById("numerationInput");
var submitNumerationBtn = document.getElementById("submitNumeration");
var resultEl = document.getElementById("result");
var nextButton = document.getElementById("next");
var finalButton = document.getElementById("final");
var finalButton2 = document.getElementById("final2");
var resultFi = document.getElementById("resultFinal");

function loadQuestion() {
    var questionData = quizData[currentQuestion];
    questionEl.textContent = questionData.question;
    answersEl.innerHTML = "";
    numerationInput.style.display = "none";
    submitNumerationBtn.style.display = "none";

    if (questionData.type === "mcq") {
        questionData.options.forEach(function(option) {
            var button = document.createElement("button");
            button.textContent = option;
            button.onclick = function() { checkAnswer(option); };
            button.dataset.selected = false;
            answersEl.appendChild(button);
        });
    } else {
        numerationInput.style.display = "block";
        submitNumerationBtn.style.display = "block";
        submitNumerationBtn.onclick = function() { checkNumerationAnswer(); };
    }
}

function checkAnswer(selected) {
    if (document.querySelector(".selected")) return; // Prevent changing choice
    var correct = quizData[currentQuestion].correct;

    document.querySelectorAll(".answers button").forEach(function(btn) {
        if (btn.textContent === selected) {
            btn.classList.add("selected"); 
            btn.style.backgroundColor = "white"; 
            btn.style.color = "black";
            btn.style.border = "black solid 2px";

            if (selected === correct) {
                score++;
                resultEl.textContent = "Correct!";
                resultEl.style.color = "green";
            } else {
                resultEl.textContent = "Wrong! The correct answer is " + correct + ".";
                resultEl.style.color = "red";
            }
        }
    });

    nextButton.style.display = "block";
}

function checkNumerationAnswer() {
    var userAnswer = numerationInput.value.trim().toLowerCase();
    var correctAnswers = quizData[currentQuestion].correct;

    if (!Array.isArray(correctAnswers)) {
        correctAnswers = [correctAnswers];
    }

    var normalizedAnswers = correctAnswers.map(function(answer) { return answer.toLowerCase(); });

    if (normalizedAnswers.includes(userAnswer)) {
        score++;
        resultEl.textContent = "Correct!";
        resultEl.style.color = "green";
    } else {
        resultEl.textContent = "Wrong! The correct answer is: " + correctAnswers.join(" or ");
        resultEl.style.color = "red";
    }

    nextButton.style.display = "block";
}

nextButton.onclick = function() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        resultEl.textContent = "";
        nextButton.style.display = "none";
        numerationInput.value = "";
        loadQuestion();
    } else {
        showFinalResult();
    }
};

function showFinalResult() {
    questionEl.textContent = "You completed the quiz!";
    answersEl.innerHTML = "";
    numerationInput.style.display = "none";
    submitNumerationBtn.style.display = "none";
    
    nextButton.style.display = "none";
    finalButton.style.display = "block";

    if (score <= 5) {
        resultEl.textContent = score + " / " + quizData.length;
        resultFi.textContent = "You didn't reach the passing score";
        resultEl.style.color = "black";
        resultFi.style.color = "red";
        finalButton.onclick = function() {
            window.location.href = "lesson1.html";
        };
    } else {
        resultEl.textContent = score + " / " + quizData.length;
        resultEl.style.color = "black";
        resultFi.textContent = "You Passed!";
        resultFi.style.color = "green";
        finalButton.style.display = "none";
        finalButton2.style.display = "block";

        finalButton2.onclick = function() {
            window.location.href = "learn_2.html";
        };
    }

    document.querySelector(".quiz-container").appendChild(finalButton);
}

loadQuestion();
