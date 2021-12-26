
body.onload = home();

function home() {
  let setOfQuestions = document.getElementById('setOfQuestions');
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
  let proportion = s.solved / s.questionsNumber;
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
  let obj = questionSet[id];
  let question = obj.questions[key];
  let functionName = question.fun_name;
  document.querySelector('#setOfQuestions').classList.add('d-none')
  let workspace = document.querySelector('#workspace')
  workspace.classList.remove('d-none')
  let questionText = document.querySelector('#question-text');
  let text = `
  <div class="buttons mb-3">
    <button class="btn" onclick="home()"><i class="fa fa-home" aria-hidden="true"></i></button>
    <button class="btn" onclick="listOfQuestions(${id})"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
    <button class="btn" onclick="questionWorkspace(${id}, ${key != 1 ? key - 1 : 1})">Oldingisi</button>
    <button class="btn" onclick="questionWorkspace(${id}, ${key != objectLength(obj.questions) ? key + 1 : key})">Keyingisi</button>
  </div>
  <h2>${functionName.slice(0, functionName.indexOf(' '))}</h2>
  <p>${question.text}</p>
  <ul>
  `
  let examples = Object.values(question.examples);
  for (let val of examples) {
    text +=  `<li>${val}</li>`
  }
  text += '</ul>'
  questionText.innerHTML = text;
}