'use strict';

let mainText = [
  'time if than more thing without which open by before the begin man school under tell should of stand go keep even but we public during small by program too part might work',
  'over ask time end mean present we much would interest what under people then no also during with off to own',
  'with at see use since most and problem home consider know nation real consider very take must through there word at during there even great',
];

let random = Math.trunc(Math.random() * 3);
document.querySelector(`.textField0${random}`).classList.toggle('hidden');
let mainTextSize = [mainText[0].length, mainText[1].length, mainText[2].length];
const counter = document.querySelector('.counter');
counter.textContent = `0 / ${mainTextSize[random]}`;
const link0 = document.querySelector('.link-0');
const link1 = document.querySelector('.link-1');
const link2 = document.querySelector('.link-2');

const resultModal = document.querySelector('.Results');
const overlayModal = document.querySelector('.overlay');
const warningMsg = document.querySelector('.warning');
let correctChar = 0;
let incorrectChar = 0;
let ctrlKeys = function (key) {
  if (
    key !== 'Enter' &&
    key !== 'Control' &&
    key !== 'OS' &&
    key !== 'Alt' &&
    key !== 'Shift' &&
    key !== 'CapsLock' &&
    key !== 'Escape' &&
    key !== 'ArrowRight' &&
    key !== 'ArrowLeft' &&
    key !== 'ArrowUp' &&
    key !== 'ArrowDown' &&
    key !== 'F1' &&
    key !== 'F2' &&
    key !== 'F3' &&
    key !== 'F4' &&
    key !== 'F5' &&
    key !== 'F6' &&
    key !== 'F7' &&
    key !== 'F8' &&
    key !== 'F9' &&
    key !== 'F10' &&
    key !== 'F11' &&
    key !== 'F12' &&
    key !== 'Tab' &&
    key !== '1' &&
    key !== '2' &&
    key !== '3' &&
    key !== '4' &&
    key != '5' &&
    key != '6' &&
    key != '7' &&
    key != '8' &&
    key !== '9' &&
    key !== '0' &&
    key != '/' &&
    key != '*' &&
    key != '-' &&
    key != '+'
  ) {
    return true;
  }
  return false;
};
const letter = document.querySelectorAll('.letter');
let adjuster = 0;
for (let i = 0; i < random; i++) {
  adjuster += mainText[i].length;
}
//Colors & Themes
const defaultColor = 'rgb(123,119,119)';
const incorrectColor = '#da487a';
const correctColor = ['#fff', '#f6a9e1', '#0066ff'];
const counterColor = ['#dfb414', '#f6a9e1', '#0066ff'];
const underlineColor = ['#dfb414', '#ff66ff', '#0080ff'];
const wrapperColor = [
  'rgb(38,38,52,0.8)',
  'rgb(10,5,60,0.7)',
  'rgb(194,240,250,0.7)',
];
const overlayColor = ['rgb(38,38,52)', '#0B053D', '#2492BC'];

let theme = 0;
let changeStyle = function () {
  document.querySelector(
    'body'
  ).style.backgroundImage = `url("Assets/Background-${theme}.jpg")`;
  document.getElementById('Heading').src = `Assets/Heading-${theme}.png`;
  document.querySelector('.overlay').style.backgroundColor =
    overlayColor[theme];
  document.querySelector('.wrapper').style.backgroundColor =
    wrapperColor[theme];
  counter.style.color = counterColor[theme];
  resultModal.style.backgroundImage = `url('Assets/Background-${theme}.jpg')`;
  for (let i = 0; i < pointer; i++) {
    letter[adjuster + i].style.color = correctColor[theme];
  }
  warningMsg.style.backgroundColor = underlineColor[theme];
};
//Changing Theme varaible using Click and Key press
link0.addEventListener('click', function () {
  theme = 0;
  changeStyle();
});
link1.addEventListener('click', function () {
  theme = 1;
  changeStyle();
});
link2.addEventListener('click', function () {
  theme = 2;
  changeStyle();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Shift') {
    theme++;
    theme = theme % 3;
    changeStyle();
  }
});

document.addEventListener('keydown', function (x) {
  if (x.getModifierState('CapsLock')) {
    warningMsg.classList.remove('hidden');
  }
});
document.addEventListener('keyup', function (x) {
  if (!x.getModifierState('CapsLock')) {
    warningMsg.classList.add('hidden');
  }
});
let pointer = 0;
let incPointer = function () {
  pointer++;
  counter.textContent = `${pointer} / ${mainTextSize[random]}`;
};
let underline = function () {
  letter[adjuster + pointer].style.textDecoration = 'underline';
  letter[adjuster + pointer].style.textDecorationColor = underlineColor[theme];
};
let removeUnderline = function () {
  letter[adjuster + pointer].style.textDecoration = 'none';
};
//Operations on a Key Press
document.addEventListener('keydown', function (e) {
  if (e.key === mainText[random][pointer]) {
    removeUnderline();
    letter[adjuster + pointer].style.color = correctColor[theme];
    incPointer();
    underline();
    correctChar++;
  } else if (e.key !== 'Backspace' && ctrlKeys(e.key)) {
    removeUnderline();
    letter[adjuster + pointer].style.color = incorrectColor;
    incPointer();
    underline();
    incorrectChar++;
  } else if (e.key === 'Backspace' && ctrlKeys(e.key)) {
    removeUnderline();
    pointer--;
    underline();
    letter[adjuster + pointer].style.color = defaultColor;
    counter.textContent = `${pointer} / ${mainTextSize[random]}`;
  }
  if (e.key === ' ') {
    document.getElementById(`spaceAudio${theme}`).play();
  }
});

//Clear Everything
let clearAll = function () {
  for (let i = 0; i <= pointer; i++) {
    letter[adjuster + i].style.color = defaultColor;
  }
  removeUnderline();
  pointer = 0;
  correctChar = 0;
  incorrectChar = 0;
  TimerOn = false;
  endTimer = undefined;
  counter.textContent = `${pointer} / ${mainTextSize[random]}`;
};
document.getElementById('redo').addEventListener('click', clearAll);
document.getElementById('redo').addEventListener('mouseover', function () {
  document.querySelector('.modal-restart').classList.remove('hidden');
});
document.getElementById('redo').addEventListener('mouseout', function () {
  document.querySelector('.modal-restart').classList.add('hidden');
});
//Show Modal
let closeModal = function () {
  resultModal.classList.add('hidden');
  overlayModal.classList.add('hidden');
  clearAll();
  document.querySelector('.info').classList.add('hidden');
};
let showModal = function () {
  resultModal.classList.remove('hidden');
  overlayModal.classList.remove('hidden');
  document.getElementById(`myAudio${theme}`).play();
};
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
document.querySelector('.close').addEventListener('click', closeModal);
overlayModal.addEventListener('click', closeModal);
let showInfo = function () {
  document.querySelector('.info').classList.remove('hidden');
  overlayModal.classList.remove('hidden');
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  overlayModal.addEventListener('click', closeModal);
};
document.getElementById('iBtn').addEventListener('click', showInfo);
//Timer Starting:
let startTimer;
let endTimer;
let currentSpeed = 0;
let highestSpeed = 0;
let TimerOn = false;
document.addEventListener('keydown', function (event) {
  if (
    !TimerOn &&
    ctrlKeys(event.key) &&
    event.key != ' ' &&
    event.key != 'Backspace'
  ) {
    startTimer = new Date();
    TimerOn = true;
  }
});
document.addEventListener('keydown', function (e) {
  if (pointer === mainTextSize[random]) {
    if (!endTimer) {
      endTimer = new Date();
    }
    const diff = endTimer - startTimer;
    const timeTaken = Math.trunc(diff / 1000);
    const accuracy = Math.round(
      (correctChar * 100) / (correctChar + incorrectChar)
    );
    currentSpeed = Math.round(
      (((correctChar / 5) * (accuracy / 100)) / timeTaken) * 60
    );
    document.getElementById('currentSpeed').textContent = `${currentSpeed} wpm`;
    document.getElementById('Accuracy').textContent = `${accuracy} %`;
    document.getElementById('timeTaken').textContent = `${timeTaken} s`;
    document.getElementById('charCount').textContent =
      correctChar + incorrectChar;
    showModal();
  }
  if (currentSpeed > highestSpeed) {
    highestSpeed = currentSpeed;
  }
  document.getElementById('prevScore').textContent = currentSpeed;
  document.getElementById('highScore').textContent = highestSpeed;
});
