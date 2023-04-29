import KEYS from './keys';

const checkArrKey = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'AltRight'];

const checkArrKeyForLang = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal'];

let arrCntrAlt = [];

//Создание клавиатуры
const pastKeyInKeyboard = (arrKey) => {
  const keyboard = document.querySelector('.keyboard');

  for (let i = 0; i < arrKey.length; i++) {
    let container = document.createElement('div');
    container.className = 'keyboard__row';
    keyboard.append(container);

    let currentObj = arrKey[i];

    createElement(currentObj, container);
  }
}

//Наполение клавиш
const createElement = (obj, placePast) => {
  const keyboard = document.querySelector('.keyboard');

  for (let key in obj) {
    let value = obj[key];

    let element = document.createElement('div');
    element.className = `keyboard__key ${key}`;

    if (keyboard.className.includes('lang') && value.length > 1) {
      if (!checkArrKeyForLang.includes(element.classList[1])) {
        console.log(element.classList)
        element.innerHTML = value[1];
      } else {
        element.innerHTML = value[0];
      }
    } else {
      element.innerHTML = value[0];
    }

    placePast.append(element);
  }
};

//Сочетание клавиш
const watchClickCntrAlt = (e) => {
  //Переключение языка
  const keyboard = document.querySelector('.keyboard');
  addActiveClassKey(e.code);
  arrCntrAlt.push(e.key);

  if (arrCntrAlt[0] === 'Control' && arrCntrAlt[1] === 'Alt') {
    keyboard.classList.toggle('lang');
    setTimeout(() => {
      keyboard.innerHTML = '';
      pastKeyInKeyboard(KEYS);
    }, 310);
  }

  if (arrCntrAlt.length >= 2 || arrCntrAlt[0] !== 'Control') {
    arrCntrAlt = [];
  }
};

//Включен CapsLock
const watchClickCapsLock = (e) => {
  const buttonCapsLock = document.querySelector('.CapsLock');

  if (e.getModifierState('CapsLock')) {
    buttonCapsLock.classList.add('active-CapsLock');
    chancgeKeyForCapsLock();
  } else {
    buttonCapsLock.classList.remove('active-CapsLock');
    chancgeKeyForCapsLock();
  }
}

//Проверка на букву
const isLetter = (str) => {
  let regexp = /^\p{L}$/u;
  return regexp.test(str);
}

const chancgeKeyForCapsLock = () => {
  const buttons = document.querySelectorAll('.keyboard__key');
  const activeCapsLock = document.querySelector('.active-CapsLock');

  const activeShift = document.querySelector('.active-Shift');

  for (let i = 0; i < buttons.length; i++) {
    if (isLetter(buttons[i].textContent)) {
      if (activeCapsLock || activeShift) {
        buttons[i].textContent = buttons[i].textContent.toUpperCase();
      } else {
        buttons[i].textContent = buttons[i].textContent.toLowerCase();
      }
    }
  }
}

//Зажатие Shift
const watchClickShift = (e) => {
  const keyboard = document.querySelector('.keyboard');

  if (e.key === 'Shift') {
    keyboard.classList.add('active-Shift');
    chancgeKeyForCapsLock();
    chancgeKeyForShift();
  }
}

const chancgeKeyForShift = () => {
  const buttons = document.querySelectorAll('.keyboard__key');
  const activeShift = document.querySelector('.active-Shift');

 const objFirstCommonKeys = KEYS[0];

  for (let key in objFirstCommonKeys){
    let value = objFirstCommonKeys[key];

    let element = document.querySelector(`.${key}`);
    if (activeShift && value.length > 1){
      element.textContent = value[1];
    } else {
      element.textContent = value[0];
    }
  }
}

//Добавление активного класса
const addActiveClassKey = (keyCode) => {
  const element = document.querySelector(`.${keyCode}`);
  element.classList.add('active-button');
}

//Удаление активного класса
const removeActiveClassKey = (e) => {
  const element = document.querySelector(`.${e.code}`);
  const keyboard = document.querySelector('.keyboard');
  element.classList.remove('active-button');

  if (e.key === 'Shift') {
    keyboard.classList.remove('active-Shift');
    chancgeKeyForCapsLock();
    chancgeKeyForShift();
  }
}

//Вставка контента в форму по нажатию клавиш
const pastTextContent = (e) => {
  const windowContent = document.querySelector('.content__window');
  event.preventDefault();

  const key = document.querySelector(`.${e.code}`);

  windowContent.setAttribute('value', '');

  const classKey = key.classList;

  let isIncludesClassForCheck = false;

  classKey.forEach((item) => {
    if (checkArrKey.includes(item)) {
      isIncludesClassForCheck = true;
    }
  });

  if (!isIncludesClassForCheck) {
    windowContent.value += key.textContent;
  }
}

//общая функция по нажатию на клавиатуру
const watchClick = (e) => {
  watchClickCapsLock(e);
  watchClickCntrAlt(e);
  watchClickShift(e);
}

function createKeyboard() {
  const windowContent = document.querySelector('.content__window');
  pastKeyInKeyboard(KEYS);

  document.addEventListener('keydown', watchClick);

  document.addEventListener('keyup', removeActiveClassKey);

  windowContent.addEventListener('keydown', pastTextContent);
}

export default createKeyboard;
