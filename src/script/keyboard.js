import KEYS from './keys';

const checkArrKey = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'AltRight'];

const checkArrKeyForLang = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal'];

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

    if (keyboard.className.includes('lang') && value.length > 3) {
      if (!checkArrKeyForLang.includes(element.classList[1])) {
        element.innerHTML = value[2];
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
const watchPressCntrAlt = (e) => {
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
const watchPressCapsLock = (e) => {
  const buttonCapsLock = document.querySelector('.CapsLock');

  if (e.getModifierState('CapsLock')) {
    buttonCapsLock.classList.add('active-CapsLock');
    chancgeKeyForCapsLockAndShift();
  } else {
    buttonCapsLock.classList.remove('active-CapsLock');
    chancgeKeyForCapsLockAndShift();
  }
}

//Проверка на букву
const isLetter = (str) => {
  let regexp = /^\p{L}$/u;
  return regexp.test(str);
}

const chancgeKeyForCapsLockAndShift = () => {
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
    chancgeKeyForCapsLockAndShift();
    chancgeKeyForShift();
  }
}

const chancgeKeyForShift = () => {
  const keyboard = document.querySelector('.keyboard');
  const buttons = document.querySelectorAll('.keyboard__key');
  const activeShift = document.querySelector('.active-Shift');

  const objFirstCommonKeys = KEYS[0];

  for (let key in objFirstCommonKeys) {
    let value = objFirstCommonKeys[key];

    let element = document.querySelector(`.${key}`);
    if (activeShift) {
      if (keyboard.className.includes('lang')) {
        if (value.length === 4) {
          element.textContent = value[3];
        } else if (value.length === 3) {
          element.textContent = value[2];
        } else if (value.length === 2) {
          element.textContent = value[1];
        }
      } else {
        if (value.length > 1) {
          element.textContent = value[1];
        }
      }
    } else {
      element.textContent = value[0];

      if (keyboard.className.includes('lang')) {
        if (element.className.includes('Backquote')) {
          element.textContent = value[2];
        }
      }
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
    chancgeKeyForCapsLockAndShift();
    chancgeKeyForShift();
  }
}

//Вставка контента в форму по нажатию клавиш
const addContentAfterPressKeyboard = (e) => {
  event.preventDefault();

  pastTextContentCommon(e.code);
}

function pastTextContentCommon(eventKey) {
  const windowContent = document.querySelector('.content__window');
  const key = document.querySelector(`.${eventKey}`);

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

  if (eventKey === 'Tab') {
    windowContent.value += '   ';
  }

  //Изменение позиции курсора и Удаление символов
  if (eventKey === 'Backspace') {
    let positionСursor = windowContent.selectionStart;

    let arrValue = windowContent.value.split('');
    arrValue.splice(windowContent.selectionStart - 1, 1);
    windowContent.value = arrValue.join('');
    windowContent.selectionStart = positionСursor - 1;
    windowContent.selectionEnd = positionСursor - 1;
  }

  if (eventKey === 'Enter') {
    windowContent.value += '\n';
  }
}

//общая функция по нажатию на клавиатуру
const watchClick = (e) => {
  const windowContent = document.querySelector('.content__window');
  windowContent.focus();

  watchPressCapsLock(e);
  watchPressCntrAlt(e);
  watchClickShift(e);
}

//Добавлние клавиш в клавиатуру по клику
const addContentAndActiveClassAfterClick = (e) => {
  const buttonCapsLock = document.querySelector('.CapsLock');
  let classElement = e.target.classList;

  if (classElement[0] === 'keyboard__key') {
    e.target.classList.add('active-button');
    setTimeout(() => {
      e.target.classList.remove('active-button');
    }, 310);

    pastTextContentCommon(classElement[1]);

    if (classElement[1] === 'CapsLock') {
      buttonCapsLock.classList.toggle('active-CapsLock');
    }
    chancgeKeyForCapsLockAndShift();
  }
}

//Изменение клавиш по клику на клавишу Shift
const addContentForClickShift = (e) => {
  if (e.target.textContent === 'shift') {
    chancgeKeyForCapsLockAndShift();
  }
}

function createKeyboard() {
  const keyboard = document.querySelector('.keyboard');
  const windowContent = document.querySelector('.content__window');
  pastKeyInKeyboard(KEYS);

  document.addEventListener('keydown', watchClick);

  document.addEventListener('keyup', removeActiveClassKey);

  windowContent.addEventListener('keydown', addContentAfterPressKeyboard);

  keyboard.addEventListener('click', addContentAndActiveClassAfterClick);

  keyboard.addEventListener('mousedown', addContentForClickShift);
}

export default createKeyboard;
