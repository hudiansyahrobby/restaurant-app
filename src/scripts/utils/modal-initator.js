const showModal = () => {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');

  overlay.style.display = 'block';
  modal.classList.add('show');
};

const hideModal = () => {
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');

  const closeModal = () => {
    modal.classList.remove('show');
    overlay.style.display = 'none';
  };
  close.addEventListener('click', closeModal);
};

export { showModal, hideModal };
