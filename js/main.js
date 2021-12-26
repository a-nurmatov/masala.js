if (!localStorage.getItem('questionSet')) {
  let storage = JSON.stringify(questionSet);
  localStorage.setItem('questionSet', storage);
}

questionSet = JSON.parse(localStorage.getItem('questionSet'));
body.onload = home();

function home() {
  let setOfQuestions = document.getElementById('setOfQuestions');
  document.getElementById('subtitle').classList.remove('d-none')
  setOfQuestions.classList.remove('d-none');
  document.querySelector('#workspace').classList.add('d-none')
  setOfQuestions.innerHTML = '';
  Object.values(questionSet).map((s) => {
    setOfQuestions.innerHTML += `<div class="col-md-6 col-lg-4 col-xl-3">
    <div class="set-box" onclick="listOfQuestions(${s.id})">
      <p class="set-title mb-0">${s.title}</p>
      <div class="d-flex justify-content-between">
        <p class="problem-number align-self-end"> ${s.questionsNumber} <i class="fas fa-hourglass-half"></i></p>
        <div class="skill">
          <div class="outer">
            <div class="inner">
              <div id="percent${s.id}">
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100px" height="100px">
              <circle cx="50" cy="50" r="40" stroke-linecap="round" id="circle${s.id}"/>
            </svg>
          </div>
        </div>
      </div>
    </div>`
    calculateProportion(s);
  })
}

function calculateProportion(s) {
  let solved = Object.values(s.questions).filter((q) => q.solved).length;
  let proportion = solved / s.questionsNumber;
  document.getElementById(`percent${s.id}`).innerHTML = Math.floor(proportion * 100) + '%';
  document.getElementById(`circle${s.id}`).style.strokeDashoffset = Math.floor(260 - 260 * proportion);
}

function listOfQuestions(id) {
  let set = questionSet[id];
  let setOfQuestions = document.getElementById('setOfQuestions');
  setOfQuestions.classList.remove('d-none');
  document.querySelector('#workspace').classList.add('d-none')
  setOfQuestions.innerHTML = `<h2 class="mb-4"><span>${set.title}</span> <button class="btn" style="background:#303041" onclick="home()"><i class="fa fa-arrow-left" aria-hidden="true"></i></button></h2>`;
  let questions = set.questions;

  for (let key in questions) {
    let question = questions[key];
    let functionName = question.fun_name;
    setOfQuestions.innerHTML += `<div class="col-md-6 col-lg-4 col-xl-3">
        <div class="set-box d-flex justify-content-between align-items-center" onclick="questionWorkspace(${id}, ${key})">
        <p class="set-title m-0">${functionName.slice(0, functionName.indexOf(' '))}</p>
        <p class="m-0 d-none" id="solved${key}"><i class="fa fa-check" aria-hidden="true"></i></p>
        </div></div>`;
    if (question.solved) document.getElementById(`solved${key}`).classList.remove('d-none');
  }
}

function questionWorkspace(id, key) {
  document.getElementById('subtitle').classList.add('d-none')
  let obj = questionSet[id];
  let question = obj.questions[key];
  if (question.solved) document.getElementById('final-result').innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>';
  else document.getElementById('final-result').innerHTML = '';
  console.log(question.solved, 'check workspace');
  let functionName = question.fun_name;
  document.querySelector('#setOfQuestions').classList.add('d-none')
  let workspace = document.querySelector('#workspace')
  workspace.classList.remove('d-none');
  let show = document.getElementById('result');
  show.innerHTML = '';
  let questionText = document.querySelector('#question-text');
  let text = `
  <div class="buttons mb-4">
    <button class="btn mb-2 mb-sm-0" onclick="home()"><i class="fa fa-home" aria-hidden="true"></i></button>
    <button class="btn mb-2 mb-sm-0" onclick="listOfQuestions(${id})"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
    <button class="btn mb-2 mb-sm-0" onclick="questionWorkspace(${id}, ${key != 1 ? key - 1 : 1})">Oldingisi</button>
    <button class="btn mb-2 mb-sm-0" onclick="questionWorkspace(${id}, ${key != objectLength(obj.questions) ? key + 1 : key})">Keyingisi</button>
  </div>
  <h2>${functionName.slice(0, functionName.indexOf(' '))}</h2>
  <p>${question.text}</p>
  <ul>
  `
  let examples = question.examples;
  for (let val of examples) {
    text += `<li>${val}</li>`
  }
  text += '</ul>'
  questionText.innerHTML = text;
  if (!localStorage.getItem('' + id + key)) {
    document.getElementById('answer').value = `function ${question.fun_name} {

}`} else document.getElementById('answer').value = localStorage.getItem('' + id + key);

  document.getElementById('submit').setAttribute('data-question', `${id}${key}`);
}

function submit() {
  let questionData = document.getElementById('submit').getAttribute('data-question');
  let textForAnswer = document.getElementById('answer').value;
  let setId = questionData[0];
  let questionId = questionData[1];
  let question = questionSet[setId].questions[questionId];
  question.solved ? true : localStorage.setItem(questionData, textForAnswer);
  let functionData = question.fun_name.split(' ');
  let ans = document.getElementById('answer').value;
  let functionName = functionData[0];
  let trueAnswer = 0;
  let check = question.check;
  let answers = question.answers;
  let show = document.getElementById('result');
  show.innerHTML = '';
  for (let i = 0; i < check.length; i++) {
    let answer;
    try {
      answer = eval(ans + `${functionName}(${check[i]})`);
    } catch (error) {
      show.innerHTML = error;
    }
    if (answer == answers[i]) {
      trueAnswer++;
      show.innerHTML += `<p class="d-flex justify-content-between align-items-center flex-wrap">${functionName}(${check[i]}) => ${answers[i]} <button class="btn bg-success result-badge">Javobingiz: ${answer}</button></p>`;
    } else {
      show.innerHTML += `<p class="d-flex justify-content-between align-items-center flex-wrap">${functionName}(${check[i]}) => ${answers[i]} <button class="btn bg-danger result-badge">Javobingiz: ${answer}</button></p>`;
    }
  }
  if (trueAnswer === answers.length) {
    document.getElementById('final-result').innerHTML = '<i class="fa fa-check-circle" aria-hidden="true"></i>'
    question.solved = true;
    let storage = JSON.stringify(questionSet);
    localStorage.setItem('questionSet', storage);
    questionSet = JSON.parse(localStorage.getItem('questionSet'));
  }

}


const input = document.querySelector('textarea');
const gutter = document.querySelector('.gutter');
let val = input.value;
let numOfLines = 1;

function update(e) {
  val = input.value;

  let lineBreaks = val.match(/\n/gi) || [];
  let numOfSpans = gutter.childElementCount;
  numOfLines = lineBreaks.length ? lineBreaks.length + 1 : 1;

  gutter.innerHTML = ""
  for (var i = 0; i < numOfLines; i++) {
    var el = document.createElement('span');
    el.innerHTML = i + 1;
    gutter.appendChild(el);
  }
}

input.addEventListener('input', update);


document.getElementById('answer').addEventListener('keydown', function (e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);

    // put caret at right position again
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});