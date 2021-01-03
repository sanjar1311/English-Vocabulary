var $_ = function(selector, node = document) {
  return node.querySelector(selector);
}

var $$_ = function(selector, node = document) {
  return node.querySelectorAll(selector);
}

var createElement = function(element, elementClass, elementText) {
  var newElement = document.createElement(element);

  if(elementClass) {
    newElement.setAttribute('class', elementClass);
  }

  if(elementText) {
    newElement.textContent = elementText;
  }

  return newElement;
}

var elForm = $_('.js-form');
var elEngInput = $_('.js-eng-input');
var elUzbInput = $_('.js-uzb-input');

if(elForm) {
  var elUzbOutputList = $_('.js-uzb-output-list', elForm);
  var elEngOutputList = $_('.js-eng-output-list', elForm);
  var elOutputBox = $_('.js-output-box', elForm);

  var engWords = [];
  var uzbWords = [];

  elEngInput.focus();

  var wordsLocalEng = JSON.parse(localStorage.getItem('videosList1'));
  var wordsLocalUzb = JSON.parse(localStorage.getItem('videosList2'));

  if(wordsLocalEng) {
    for(var i = 0; i < wordsLocalEng.length; i++) {
      var engItem = createElement('li');
      engItem.textContent = wordsLocalEng[i];
      engItem.setAttribute('class', 'list-group-item');
      elEngOutputList.appendChild(engItem);
    }
  }

  if(wordsLocalUzb) {
    for(var i = 0; i < wordsLocalUzb.length; i++) {
      var uzbItem = createElement('li');
      uzbItem.textContent = wordsLocalUzb[i];
      uzbItem.setAttribute('class', 'list-group-item')
      elUzbOutputList.appendChild(uzbItem);
    }
  }

  elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    engWords.push(elEngInput.value);
    uzbWords.push(elUzbInput.value);

    localStorage.setItem('videosList1',JSON.stringify(engWords));
    localStorage.setItem('videosList2', JSON.stringify(uzbWords));

    var wordsLocalEng = JSON.parse(localStorage.getItem('videosList1'));
    elEngOutputList.innerHTML = '';
    for(var i = 0; i < wordsLocalEng.length; i++) {
      var engItem = createElement('li');
      engItem.textContent = wordsLocalEng[i];
      engItem.setAttribute('class', 'list-group-item');
      elEngOutputList.appendChild(engItem);
    }

    var wordsLocalUzb = JSON.parse(localStorage.getItem('videosList2'));
    elUzbOutputList.innerHTML = '';
    for(var i = 0; i < wordsLocalUzb.length; i++) {
      var uzbItem = createElement('li');
      uzbItem.textContent = wordsLocalUzb[i];
      uzbItem.setAttribute('class', 'list-group-item')
      elUzbOutputList.appendChild(uzbItem);
    }

    elUzbInput.value = '';
    elEngInput.value = '';
    elEngInput.focus();

  });
  var elStartBtn = createElement('a','btn btn-primary btn-block w-25 mx-auto mt-4','Start');
  elStartBtn.href = 'game.html';
  document.body.appendChild(elStartBtn);
}

var elCheckForm = $_('.js-check-form');

if(elCheckForm){

  var elCheckEngInput = $_('.js-check-eng-input',elCheckForm);
  var elCheckOutput = $_('.js-check-output', elCheckForm);

  var wordsLocalEng = JSON.parse(localStorage.getItem('videosList1'));
  var wordsLocalUzb = JSON.parse(localStorage.getItem('videosList2'));


  elCheckEngInput.focus();
  var index = Math.floor(Math.random() * wordsLocalUzb.length);
  var randomWord = wordsLocalUzb[index];
  elCheckOutput.textContent = randomWord;
  elCheckOutput.textContent = wordsLocalUzb[index];

  elCheckForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

      var index = Math.floor(Math.random() * wordsLocalUzb.length);
      var randomWord = wordsLocalUzb[index];
      elCheckOutput.textContent = randomWord;
    if(elCheckEngInput.value === wordsLocalEng[index]) {
      console.log("to'g'ri");
    }else{
      console.log("noto'g'ri");
    }

    elCheckEngInput.value = '';
  });
}