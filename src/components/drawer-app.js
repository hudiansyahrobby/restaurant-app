class DrawerApp extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="drawer">
      <ul class="drawer__menus">
        <li class="drawer__menu">
          <a class="drawer__link" href="/">Home</a>
        </li>
        <li class="drawer__menu">
          <a class="drawer__link" href="#/favorite">Favorite</a>
        </li>
        <li class="drawer__menu">
          <a class="drawer__link" href="https://github.com/hudiansyahrobby" target="__blank" rel="noopener noreferrer">About Us</a>
        </li>
      </ul>
    </nav>    
        `;
  }
}

customElements.define('drawer-app', DrawerApp);
