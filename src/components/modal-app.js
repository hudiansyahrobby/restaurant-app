class ModalApp extends HTMLElement {
  connectedCallback() {
    const reloadPage = () => {
      location.reload();
    };
    this.innerHTML = `
        <div class="modal">
            <h2 class="modal__title">Something Went Wrong</h2>
            <a href="/" class="btn btn-purple modal__button">Go to Homepage</a>
            <p>OR</p>
            <button class="btn btn-purple modal__button refresh__btn">Refresh The Page</button>

        </div>
            `;

    const refreshBtn = document.querySelector('.refresh__btn');
    refreshBtn.addEventListener('click', reloadPage);
  }
}

customElements.define('modal-app', ModalApp);
