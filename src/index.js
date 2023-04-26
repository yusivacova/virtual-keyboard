import '@babel/polyfill';
import './index.html';
import './styles/index.scss';

import createPageStructure from './script/page-structure';

window.onload = function () {
  createPageStructure();
};
