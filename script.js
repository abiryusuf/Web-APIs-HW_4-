//Get element 
var beginButton = document.querySelector("#begin");
var timer = document.querySelector("#timer");
//Count in second
var time = 60; 
var quizContainer = document.querySelector('#quiz-box');
var highscoreButton = document.querySelector('#view-highscores');
var question = 0;
var score = 0;

var quizCard;

var highscoreInitials = [];
var highscores = [];
//Question and Answer
var questions = [
	{
		question: "Which function of an Array object calls a function for each element in the array?",
		answers: [
			"a. ForEach","b. Every", "c. ForEvery", "d. Each"
		],
		correctAnswer: 0
	},
	{
		question: "How to write an ‘if’ statement for executing some code.If “i” is NOT equal to 8?",
		answers: [
			"a. Interface","b. Throws", "c. Program", "d. Short"
		],
		correctAnswer: 0
	},
	{
		question: "What is the HTML tag under which one can write the JavaScript code?",
		answers: [
			"a. Javascript","b. Scripted", "c. Script", "d. JS"
		],
		correctAnswer: 2
	},

	{
		question: "In JavaScript, we do not have datatypes like integer and float. What is the function that can be used to check if the number is an integer or not?",
		answers: [
			"a. Integer","b. ifInteger","c. isInteger", "d. ifinteger"
		],
		correctAnswer: 2
	},
	{
		question: " Which of the following is an advantage of using JavaScript?",
		answers: [
			"a. Increased interacivity","b. Less server interaction", "c. Immediate feedback", "d. All the above"
		],
		correctAnswer: 3
	}
];




function showQuestion (questionNumber) {

	quizCard = document.createElement("div");
	quizCard.className ="card";

	quizContainer.appendChild(quizCard);



	cardHeader = document.createElement("div");
	cardHeader.className = "card-header";

	cardHeader.textContent = questions[questionNumber].question;

	quizCard.appendChild(cardHeader);

	cardBody = document.createElement("div");
	cardBody.className = "card-body";
	quizCard.appendChild(cardBody);

	questions[questionNumber].answers.forEach((answerOption, index) => {
		var answerBtn = document.createElement("button");
		answerBtn.className = "btn btn-primary answerBtn";
		answerBtn.setAttribute("data-answer-index",index);
		answerBtn.textContent = answerOption;
		cardBody.appendChild(answerBtn);
	});


	var answerConfirm = document.createElement("div");
	cardBody.appendChild(answerConfirm);

	//build a function to increment the value 
	cardBody.addEventListener('click', (event) => {
		var isButton = event.target.nodeName === 'BUTTON';
		if (isButton) {
			answerSelected = parseInt(event.target.getAttribute("data-answer-index"));
			if (answerSelected === questions[question].correctAnswer) {
				score += 1;
				answerConfirm.textContent="Correct!";
				answerConfirm.setAttribute("style", "color: white; background-color: green; font-size: 20px")
			}
			else {
				answerConfirm.textContent="Wrong!";
				answerConfirm.setAttribute("style", "color: white; background-color: red; font-size: 20px")
				time -= 5;
			}
			setTimeout(function(){
				answerConfirm.textContent="";
				quizContainer.removeChild(quizCard);
				question+=1;
				if (question < questions.length) {
					showQuestion(question);
				} 
				},1000);

		}
	});

};

function answerConfirmation(confirm) {

	setTimeout(function(){
		confirmAnswer = quizContainer.textContent=msg;
		},3000);
}

function quizComplete() {
	if (time ===0){
		quizContainer.removeChild(quizContainer.firstElementChild);
	}
	var quizCard = document.createElement("div");
	quizCard.className ="card";

	quizContainer.appendChild(quizCard);

	cardHeader = document.createElement("div");
	cardHeader.className = "card-header";

	cardHeader.textContent = "All done!";

	quizCard.appendChild(cardHeader);

	cardBody = document.createElement("div");
	cardBody.className = "card-body";
	cardBody.textContent = "Your score was "+score;
	
	formElement = document.createElement("form");
	formElement.className="form-inline";

	inputTextCol = document.createElement("div");
	inputTextCol.className="form-group mb-3";	
	inputText = document.createElement("div");
	inputText.textContent = "Enter Initials:";
	inputTextCol.appendChild(inputText);

	inputBoxCol = document.createElement("div");
	inputBoxCol.className="form-group mb-3";
	inputBox = document.createElement("input");
	inputBox.type = "text";
	inputBox.className = "form-control"
	inputBox.id ="initial";
	inputBoxCol.appendChild(inputBox);

	submitButtonCol = document.createElement("div");
	submitButtonCol.className = "form-group mb-3";
	submitButton = document.createElement("button");
	submitButton.className = "btn btn-primary answerBtn";
	submitButton.textContent = "Submit";
	submitButtonCol.appendChild(submitButton);

	formElement.appendChild(inputTextCol);
	formElement.appendChild(inputBoxCol);
	formElement.appendChild(submitButtonCol);

	cardBody.appendChild(formElement);
	quizCard.appendChild(cardBody);

	submitButton.addEventListener("click", function(event) {
		event.preventDefault();
	  
		var nameInitial = document.querySelector("#initial").value;
		highscoreInitials.push(nameInitial);
		highscores.push(score);
		localStorage.setItem("initial", JSON.stringify(highscoreInitials));
		localStorage.setItem("score", JSON.stringify(highscores));

		// defaults time
		timer.textContent = 60;
		score=0;
		question=0;
		quizContainer.removeChild(quizCard);
		time=60;
	  });

}
  

function startTimer() {

	if (quizContainer.childNodes.length >1) {
		quizContainer.removeChild(quizContainer.firstElementChild);
	}

	if (time === 60){
		showQuestion(question);
		interval = setInterval(function() {
			time--;
			timer.textContent = time;
			if(time===0 | question >= questions.length) {
				clearInterval(interval);
				
				quizComplete();
				return;
			}

		}, 1000);
	}
  }

beginButton.addEventListener("click",startTimer);

highscoreButton.addEventListener("click",showHighscores);

function showHighscores() {

	if (quizContainer.childNodes.length >1) {
		quizContainer.removeChild(quizContainer.firstElementChild);
	}
	var users = JSON.parse(localStorage.getItem("initial"));
	var scores = JSON.parse(localStorage.getItem("score"));

	var tbody =	document.createElement("table");
	tbody.className ="table table-bordered";

	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.textContent = "Initial";
	var td2 = document.createElement("td");
	td2.textContent = "Score";
	tr.appendChild(td1);
	tr.appendChild(td2);
	tbody.appendChild(tr);

	for(i=0; i< users.length; i++) {
		var tr = document.createElement("tr");

		var td1 = document.createElement("td");
		td1.textContent = users[i];
		var td2 = document.createElement("td");
		td2.textContent = scores[i];
		tr.appendChild(td1);
		tr.appendChild(td2);
		tbody.appendChild(tr);
	}

	quizContainer.appendChild(tbody);

	var clearButton = document.createElement("button");
	clearButton.className = "btn btn-dark answerBtn";
	clearButton.textContent = "Clear";
	quizContainer.appendChild(clearButton);

	clearButton.addEventListener("click",clearFunction);
	
	function clearFunction () {
		localStorage.clear();
		while (quizContainer.childNodes.length >1) {
			quizContainer.removeChild(quizContainer.firstElementChild);
		}

	}

 }