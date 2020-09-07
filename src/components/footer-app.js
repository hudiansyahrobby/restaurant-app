class FooterApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <h2 class="footer__title">Copyright © 2020 - Restaurant Apps</h1>
      </footer>
          `;
  }
}

customElements.define('footer-app', FooterApp);
