import KEYS from './keys';

const checkArrKey = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'AltRight'];

const checkArrKeyForLang = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal'];

let arrCntrAlt = [];

let isChangeLangOnRu = false;

//  Наполение клавиш
const createElement = (obj, placePast) => {
  const keyboard = document.querySelector('.keyboard');
  const index = 0;

  for (let key in obj) {
    const value = obj[key];

    const element = document.createElement('div');
    element.className = `keyboard__key ${key}`;

    element.innerHTML = value[index];

    if (keyboard.className.includes('lang') && value.length > 3) {
      const check = (!checkArrKeyForLang.includes(element.classList[index + 1]));
      element.innerHTML = (check) ? value[index + 2] : value[index];
    }

    placePast.append(element);
  }
};

//  Создание клавиатуры
const pastKeyInKeyboard = (arrKey) => {
  const keyboard = document.querySelector('.keyboard');

  for (let i = 0; i < arrKey.length; i += 1) {
    const container = document.createElement('div');
    container.className = 'keyboard__row';
    keyboard.append(container);

    const currentObj = arrKey[i];

    if (isChangeLangOnRu) {
      keyboard.classList.add('lang');
      isChangeLangOnRu = false;
    }

    createElement(currentObj, container);
  }
};

const chancgeKeyForCapsLockAndShift = () => {
  const buttons = document.querySelectorAll('.keyboard__key');
  const activeCapsLock = document.querySelector('.active-CapsLock');

  const activeShift = document.querySelector('.active-Shift');

  for (let i = 0; i < buttons.length; i += 1) {
    if (buttons[i].textContent.length === 1 && !checkArrKey.includes(buttons[i].classList[1])) {
      if (activeCapsLock || activeShift) {
        buttons[i].textContent = buttons[i].textContent.toUpperCase();
      } else {
        buttons[i].textContent = buttons[i].textContent.toLowerCase();
      }
    }
  }
};

const chancgeKeyForShift = () => {
  const keyboard = document.querySelector('.keyboard');
  const activeShift = document.querySelector('.active-Shift');

  const objFirstCommonKeys = KEYS[0];
  const index = 0;

  for (let key in objFirstCommonKeys) {
    const value = objFirstCommonKeys[key];
    const element = document.querySelector(`.${key}`);

    if (activeShift) {
      const check = (keyboard.className.includes('lang') && value.length >= 2);
      element.textContent = (check) ? value[value.length - 1] : value[index + 1];

      if (value.length < 2) element.textContent = value[index];
    } else {
      const check = (keyboard.className.includes('lang') && element.className.includes('Backquote'));
      element.textContent = (check) ? value[index + 2] : value[index];
    }
  }
};

//  Добавление активного класса
const addActiveClassKey = (keyCode) => {
  const element = document.querySelector(`.${keyCode}`);

  if (element) {
    element.classList.add('active-button');
  }
};

//  Удаление активного класса
const removeActiveClassKey = (e) => {
  const element = document.querySelector(`.${e.code}`);
  const keyboard = document.querySelector('.keyboard');

  if (element) {
    element.classList.remove('active-button');
  }

  if (e.key === 'Shift') {
    keyboard.classList.remove('active-Shift');
    chancgeKeyForCapsLockAndShift();
    chancgeKeyForShift();
  }
};

//  Сочетание клавиш
const watchPressCntrAlt = (e) => {
  //  Переключение языка
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

//  Включен CapsLock
const watchPressCapsLock = (e) => {
  const buttonCapsLock = document.querySelector('.CapsLock');

  if (e.getModifierState('CapsLock')) {
    buttonCapsLock.classList.add('active-CapsLock');
    chancgeKeyForCapsLockAndShift();
  } else {
    buttonCapsLock.classList.remove('active-CapsLock');
    chancgeKeyForCapsLockAndShift();
  }
};

//  Зажатие Shift
const watchClickShift = (e) => {
  const keyboard = document.querySelector('.keyboard');

  if (e.key === 'Shift') {
    keyboard.classList.add('active-Shift');
    chancgeKeyForCapsLockAndShift();
    chancgeKeyForShift();
  }
};

function pastContentWhenChangeCursor(areaContent, position, element) {
  areaContent.selectionStart = position + 1;
  areaContent.selectionEnd = position + 1;

  if (position !== areaContent.value.length - 1) {
    const newPosition = areaContent.selectionStart;
    const arrValue = areaContent.value.split('');
    const firstPart = arrValue.splice(0, areaContent.selectionStart - 1);
    const currentText = [element.textContent];
    arrValue.pop();
    const content = [...firstPart, ...currentText, ...arrValue];
    currentText.push(element.textContent);
    areaContent.innerHTML = content.join('');

    areaContent.selectionStart = newPosition;
  }
}

function pastTextContentCommon(eventKey) {
  const windowContent = document.querySelector('.content__window');
  const key = document.querySelector(`.${eventKey}`);

  const positionСursor = windowContent.selectionStart;

  windowContent.setAttribute('value', '');

  if (key) {
    const classKey = key.classList;

    let isIncludesClassForCheck = false;

    classKey.forEach((item) => {
      if (checkArrKey.includes(item)) {
        isIncludesClassForCheck = true;
      }
    });

    if (!isIncludesClassForCheck) {
      windowContent.innerHTML += key.textContent;

      pastContentWhenChangeCursor(windowContent, positionСursor, key);
    }
  }

  if (eventKey === 'Tab') {
    windowContent.innerHTML += '   ';
    windowContent.selectionStart = positionСursor + 3;
    windowContent.selectionEnd = positionСursor + 3;
  }

  //  Изменение позиции курсора и Удаление символов
  if (eventKey === 'Backspace') {
    const arrValue = windowContent.value.split('');
    arrValue.splice(windowContent.selectionStart - 1, 1);
    windowContent.innerHTML = arrValue.join('');
    windowContent.selectionStart = positionСursor - 1;
    windowContent.selectionEnd = positionСursor - 1;
  }

  if (eventKey === 'Enter') {
    windowContent.innerHTML += '\n';
    windowContent.selectionStart = positionСursor + 1;
    windowContent.selectionEnd = positionСursor + 1;
  }

  if (eventKey === 'Space') {
    windowContent.selectionStart = positionСursor + 1;
    windowContent.selectionEnd = positionСursor + 1;
  }

  if (eventKey.includes('Arrow')) {
    if (eventKey === 'ArrowRight') {
      windowContent.innerHTML += '&#9658;';
    }

    if (eventKey === 'ArrowLeft') {
      windowContent.innerHTML += '&#9668;';
    }

    if (eventKey === 'ArrowUp') {
      windowContent.innerHTML += '&#9650';
    }

    if (eventKey === 'ArrowDown') {
      windowContent.innerHTML += '&#9660;';
    }

    pastContentWhenChangeCursor(windowContent, positionСursor, key);
  }
}

//  Вставка контента в форму по нажатию клавиш
const addContentAfterPressKeyboard = (e) => {
  e.preventDefault();

  pastTextContentCommon(e.code);
};

//  общая функция по нажатию на клавиатуру
const watchClick = (e) => {
  const windowContent = document.querySelector('.content__window');
  windowContent.focus();

  watchPressCapsLock(e);
  watchPressCntrAlt(e);
  watchClickShift(e);
};

//  Добавлние клавиш в клавиатуру по клику
const addContentAndActiveClassAfterClick = (e) => {
  const buttonCapsLock = document.querySelector('.CapsLock');
  const classElement = e.target.classList;

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
};

//  Изменение клавиш по клику на клавишу Shift
const addContentForClickShift = (e) => {
  if (e.target.textContent === 'shift') {
    chancgeKeyForCapsLockAndShift();
  }
};

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

function setLocalStorageForUpdateWindow() {
  const keyboard = document.querySelector('.keyboard');
  const keyboardNames = keyboard.className;

  localStorage.setItem('keyboardClassNames', keyboardNames);
}

function getLocalStorageForUpdateWindow() {
  if (localStorage.getItem('keyboardClassNames')) {
    const keyboardNames = localStorage.getItem('keyboardClassNames');

    if (keyboardNames.includes('lang')) {
      isChangeLangOnRu = true;
    }
  }
}

window.addEventListener('beforeunload', setLocalStorageForUpdateWindow);
window.addEventListener('load', getLocalStorageForUpdateWindow);

export default createKeyboard;
