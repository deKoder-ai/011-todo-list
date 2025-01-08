import { getDate, newElement } from "./functions";

const Projects = {
  today: {
    name: 'Today',
    dueDate: getDate(),
    todoList: []
  },
  daily: {
    name: 'Daily',
    dueDate: getDate(),
    todoList: []
  },
  list: [
    
  ],
  toggleNewProjectForm: false,
  newForm() {
    const maskPage = document.getElementById('mask-page');
    maskPage.style.display = 'block';
    const npForm = document.getElementById('np-form');
    npForm.style.display = 'block';
    document.getElementById('new-project-name').focus();
    this.toggleNewProjectForm = true;
  },
  closeNewForm() {
    document.getElementById('new-project-form').reset();
    const maskPage = document.getElementById('mask-page');
    maskPage.style.display = 'none';
    const npForm = document.getElementById('np-form');
    npForm.style.display = 'none'
    this.toggleNewProjectForm = false;
  }
}

export { Projects }