class NavbarApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
      <h1 class="header__logo"><a href="/">Restaurant Apps</a></h1>
      <nav class="header__nav">
        <ul class="header__menus">
          <li class="header__menu">
            <a class="header__link" href="/">Home</a>
          </li>
          <li class="header__menu">
            <a class="header__link" href="#/favorite">Favorite</a>
          </li>
          <li class="header__menu">
            <a class="header__link" href="https://github.com/hudiansyahrobby" target="__blank" rel="noopener noreferrer">About Us</a>
          </li>
        </ul>
      </nav>
      <button class="header__button" aria-label="Hamburger menu">☰</button>
      
    </header>
      `;
  }
}

customElements.define('navbar-app', NavbarApp);
