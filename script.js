var op1 = document.querySelector(".option1");
var op2 = document.querySelector(".option2");
var op3 = document.querySelector(".option3");
var op4 = document.querySelector(".option4");
var question =document.querySelector(".question");
var questionNum = document.querySelector(".question-num-value");
var totalQuestion =document.querySelector(".total-question");
var options = document.querySelector(".options").children;
var ansTracker = document.querySelector(".answers-tracker");
var qusIndex;

var index =0;

var questions = [
    {
     q:" Which function of an Array object calls a function for each element in the array?",
     options: ["a. ForEach","b. Every", "c. ForEvery", "d. Each"],
     answer: 0
    },
    {
        q:" How to write an ‘if’ statement for executing some code.If “i” is NOT equal to 8?",
        options: ["a. Interface","b. Throws", "c. Program", "d. Short"],
        answer: 0
    },
    {
        q:"  What is the HTML tag under which one can write the JavaScript code?",
        options: ["a. Javascript","b. Scripted", "c. Script", "d. JS"],
        answer: 2
    },
    {
        q:" In JavaScript, we do not have datatypes like integer and float. What is the function that can be used to check if the number is an integer or not?",
        options: ["a. Integer","b. ifInteger","c. isInteger", "d. ifinteger"],
        answer: 2
    },
    {
        q:" Which of the following is an advantage of using JavaScript?",
        options: ["a. Increased interacivity","b. Less server interaction", "c. Immediate feedback from the user", "d. All the above"],
        answer: 3
    }
]
totalQuestion.textContent =questions.length;
function load(){
    questionNum.textContent =index +1;
   question.textContent = questions [qusIndex].q;
   op1.textContent = questions [qusIndex].options[0];
   op2.textContent = questions [qusIndex].options[1];
   op3.textContent = questions [qusIndex].options[2];
   op4.textContent = questions [qusIndex].options[3];
}
function check(element){
  if(element.id == questions[qusIndex].answer){
      element.classList.add("correct")
      updateAnsTracker("correct");
  }else{
      element.classList.add("wrong");
      updateAnsTracker("wrong");
  }
  disableOptions()
}
function disableOptions(){
    for(var i =0; i<options.length; i++){
        options[i].classList.add("disabled");
        if(options[i].id ==questions[qusIndex].answer){
            options[i].classList.add("correct");
        }
    }
}

function randomQus(){
    var randomNum = Math.floor(Math.random()*questions.length);
    qusIndex = randomNum;
    load();

}

function answerTracker(){
    for(var i =0; i<questions.length; i++){
        var div = document.createElement("div");
        div.textContent=
        ansTracker.appendChild(div);
    }
}
function updateAnsTracker(className){
  ansTracker.children[index-1].classList.add(className);
}
window.onload = function(){
    randomQus();
    answerTracker();
    

}