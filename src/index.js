import '@babel/polyfill';
import './index.html';
import './styles/index.scss';

import createPageStructure from './script/page-structure';
import createKeyboard from './script/keyboard';

window.onload = function () {
  createPageStructure();
  createKeyboard();
};
