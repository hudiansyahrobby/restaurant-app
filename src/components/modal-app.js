class ModalApp extends HTMLElement {
  connectedCallback() {
    const reloadPage = () => {
      location.reload();
    };
    this.innerHTML = `
        <div class="modal">
            <h2 class="modal__title">Something Went Wrong</h2>
            <a href="/" class="btn btn-purple modal__button">Go to Homepage</a>
        </div>
            `;

    const refreshBtn = document.querySelector('.modal__button');
    refreshBtn.addEventListener('click', reloadPage);
  }
}

customElements.define('modal-app', ModalApp);
