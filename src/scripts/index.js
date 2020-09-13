/* eslint-disable no-unused-vars */
import NavbarApp from '../components/navbar-app';
import DrawerApp from '../components/drawer-app';
import FooterApp from '../components/footer-app';
import ModalApp from '../components/modal-app';
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/style.scss';
import App from './views/app';

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
