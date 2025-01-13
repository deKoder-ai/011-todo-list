'use strict'

const newProjectFormErrors = {
  handleNewProjectFormInputErrors(name, dueDate, nameInput, dateInput) {
    const errorMsg = document.querySelector('.form-error');
    nameInput.addEventListener('input', (e) => {
      if (nameInput.value !== '') {
        nameInput.style.outline = '1px solid black';
      }
    });
    dateInput.addEventListener('input', (e) => {
      if (dateInput.value !== '') {
        dateInput.style.outline = '1px solid black';
      }
    });
    if (!name && !dueDate) {
      nameInput.style.outline = '3px solid var(--red)';
      dateInput.style.outline = '3px solid var(--red)';
      errorMsg.innerHTML = 'Please enter a name and due date for your project';
      errorMsg.style.display = 'block';
      nameInput.focus();
      return false;
    } else if (name !== '' && !dueDate) {
      nameInput.style.outline = '1px solid black';
      dateInput.style.outline = '3px solid var(--red)';
      errorMsg.innerHTML = 'Please enter a due date for your project';
      errorMsg.style.display = 'block';
      dateInput.showPicker();
      return false;
    } else if (name === '' && dueDate) {
      nameInput.style.outline = '3px solid var(--red)';
      dateInput.style.outline = '1px solid black';
      errorMsg.innerHTML = 'Please enter a name for your project';
      errorMsg.style.display = 'block';
      nameInput.focus();
      return false;
    } else {
      return true;
    }
  },
}

export { newProjectFormErrors };