/* eslint-disable no-unused-vars */
import '../components/navbar-app';
import '../components/drawer-app';
import '../components/footer-app';
import '../components/modal-app';
import 'regenerator-runtime'; /* for async await transpile */

// import styles
import '../styles/main.scss';
import '../styles/detail.scss';
import '../styles/home.scss';
import '../styles/responsive.scss';

import App from './views/app';
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('.header__button'),
  drawer: document.querySelector('.drawer'),
  overlay: document.querySelector('.overlay'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
