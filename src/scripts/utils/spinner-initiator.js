const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
  spinner.style.display = 'block';
};

const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  const overlay = document.getElementById('overlay');
  spinner.style.display = 'none';
  overlay.style.display = 'none';
};

export { showSpinner, hideSpinner };
