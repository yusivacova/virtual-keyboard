import KEYS from './keys';

const checkArrKey = ['Backspace', 'Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'AltLeft', 'MetaLeft', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'AltRight'];
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
      element.innerHTML = value[2];
      if (element.className.includes('Backquote')) {
        element.innerHTML = value[0];
      }
    } else {
      element.innerHTML = value[0];
    }

    placePast.append(element);
  }
};

//Сочетание клавиш
const watchClick = (e) => {
  addActiveClassKey(e.code);
  setTimeout(() => removeActiveClassKey(), 510);

  const keyboard = document.querySelector('.keyboard');

  arrCntrAlt.push(e.key);

  if (arrCntrAlt[0] === 'Control' && arrCntrAlt[1] === 'Alt') {
    keyboard.classList.toggle('lang');
    keyboard.innerHTML = '';
    pastKeyInKeyboard(KEYS);
  }

  if (arrCntrAlt.length >= 2 || arrCntrAlt[0] !== 'Control') {
    arrCntrAlt = [];
  }
}

const addActiveClassKey = (keyCode) => {
  const element = document.querySelector(`.${keyCode}`);

  element.classList.add('activeKey');
}

const removeActiveClassKey = () => {
  let elements = document.querySelectorAll('.keyboard__key ');

  elements.forEach((item) => {
    item.classList.remove('activeKey');
  });
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

function createKeyboard() {
  const windowContent = document.querySelector('.content__window');
  pastKeyInKeyboard(KEYS);

  document.addEventListener('keydown', watchClick);
  windowContent.addEventListener('keydown', pastTextContent);
}

export default createKeyboard;
