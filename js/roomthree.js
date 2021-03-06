'use strict';

//global variables
var life = '';
var timeOut = '';
var parentElementQuiz = document.getElementById('clickable');
var parentElementRiddle = document.getElementById('riddle');
var parentElementLife = document.getElementById('life');
var parentElementPlayerName = document.getElementById('playerName');
var allCluesArray = [];
var lifeImages = ['../img/play-health-stat-dead-small.png', '../img/play-health-stat-1.png', '../img/play-health-stat-2.png', '../img/play-health-stat-3.png', '../img/play-health-stat-4.png', '../img/play-health-stat-5.png'];

//constructor function for clues made to easily change clues
function Clues(clue) {
  this.clue = clue;
  allCluesArray.push(this);
}

new Clues('Your first riddle is: I am a necessity to some and a treasure to many.');
new Clues('Your second riddle is: I am always in shade.');
new Clues('Your third riddle is: I get fiercely hot. I vary in sizes. Without me, the moon is all we\'ll see. It\'s impossible to walk into a room without at least one of me in them.');

//check local storage for name via user input on index.html
function checkLocalStorageForName() {
  var playerName = localStorage.getItem('playerName');
  var parseName = JSON.parse(playerName);
  var renderName = document.createElement('h2');
  renderName.textContent = parseName;
  console.log(parseName);
  parentElementPlayerName.appendChild(renderName);
}
checkLocalStorageForName();

//check local storage for what the life is at
function checkLocalStorageForLife() {
  if (localStorage.getItem('life') === null) {
    life = 5;
  } else {
    var getLifeValue = localStorage.getItem('life');
    var parseLife = JSON.parse(getLifeValue);
    life = parseLife;
  }
}
checkLocalStorageForLife();

//renders the life found inlocal storage to screen and handles game over
function renderLife(life) {
  if (life <= 0) {
    parentElementQuiz.removeEventListener('click', click);
    parentElementLife.innerHTML = '';
    var maxLife = document.createElement('p');
    maxLife.textContent = life;
    parentElementLife.appendChild(maxLife);
    var lifeImage = document.createElement('img');
    lifeImage.setAttribute('src', lifeImages[0]);
    lifeImage.setAttribute('id', 'lifeicon');
    parentElementLife.appendChild(lifeImage);
    gameOver();

  } else {
    parentElementLife.innerHTML = '';
    var maxLife = document.createElement('p');
    maxLife.textContent = 'Life: ' + life + '/5';
    parentElementLife.appendChild(maxLife);
    var lifeImage = document.createElement('img');
    lifeImage.setAttribute('src', lifeImages[life]);
    lifeImage.setAttribute('id', 'lifeicon');
    parentElementLife.appendChild(lifeImage);
  }
}

//question 1
renderLife(life);
var clueText = document.createElement('p');
clueText.textContent = allCluesArray[0].clue;
parentElementRiddle.appendChild(clueText);
parentElementQuiz.addEventListener('click', click)
function click(event) {
  var item = event.target.id;
  if (item === 'mug') {
    parentElementQuiz.removeEventListener('click', click);
    right();
    quizTwo();
  } else {
    life--;
    renderLife(life);
    if (life > 0) {
      wrong();
    }
  }
}

// question 2
function quizTwo() {
  parentElementRiddle.innerHTML = '';
  var clueText = document.createElement('p');
  clueText.textContent = allCluesArray[1].clue;
  parentElementRiddle.appendChild(clueText);
  parentElementQuiz.addEventListener('click', click);
  function click(event) {
    var item = event.target.id;
    if (item === 'lamp') {
      parentElementQuiz.removeEventListener('click', click);
      right();
      quizThree();
    } else {
      life--;
      renderLife(life);
      if (life > 0) {
        wrong();
      }
    }
  }
}

//question 3
function quizThree() {
  parentElementRiddle.innerHTML = '';
  var clueText = document.createElement('p');
  clueText.textContent = allCluesArray[2].clue;
  parentElementRiddle.appendChild(clueText);
  parentElementQuiz.addEventListener('click', click)
  function click(event) {
    var item = event.target.id;
    if (item === 'bulb') {
      parentElementQuiz.removeEventListener('click', click);
      right();
      var jsonLife = JSON.stringify(life);
      localStorage.setItem('life', jsonLife);
      timeOut = setTimeout(nextPage, 1000);
      function nextPage() {
        window.location.href = 'roomthreevictory.html';
      }
     
    } else {
      life--;
      renderLife(life);
      if (life > 0) {
        wrong();
      }
    }
  }
}

//function for wrong answer inputs
function wrong() {
  var audio = new Audio('../audio/sfx/wrong.wav');
  audio.play();
  var parentElementWrong = document.getElementById('answer');
  var wrongImg = document.createElement('img');
  wrongImg.setAttribute('src', '../img/red-check.png');
  parentElementWrong.appendChild(wrongImg);
  timeOut = setTimeout(clearX, 1000);
  function clearX() {
    parentElementWrong.innerHTML = '';
  }
}

//function for right answer inputs
function right() {
  var audio = new Audio('../audio/sfx/correct.mp3');
  audio.play();
  var parentElementAnswer = document.getElementById('answer');
  var rightImg = document.createElement('img');
  rightImg.setAttribute('src', '../img/green-check.png');
  parentElementAnswer.appendChild(rightImg);
  timeOut = setTimeout(clearX, 1000);
  function clearX() {
    parentElementAnswer.innerHTML = '';
  }
}

//function to handle game over
function gameOver() {
  var audio = new Audio('../audio/sfx/wrong.wav');
  audio.play();
  var parentElementAnswer = document.getElementById('answer');
  var gameOverImg = document.createElement('img');
  gameOverImg.setAttribute('src', '../img/game-over.png');
  gameOverImg.setAttribute('id', 'gameover');
  parentElementAnswer.appendChild(gameOverImg);
  timeOut = setTimeout(gameOverScreenTime, 3000);
  function gameOverScreenTime() {
    window.location.href = 'deathscreen.html';
  }
}

// for playing audio correctly in the background
var audio = new Audio('../audio/darkshadows.mp3');
 audio.play();
