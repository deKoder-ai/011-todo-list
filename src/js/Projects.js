import { F } from './Functions.js';
import newProjectForm from '../html/newProjectForm.html';

const Projects = {
  today: {
    name: 'Today',
    dueDate: F.getDate(),
    todoList: []
  },
  daily: {
    name: 'Daily',
    dueDate: F.getDate(),
    todoList: []
  },
  list: [

  ],
  toggleNewProjectForm: false,
  newForm() {
    const mask = document.getElementById('mask-page');
    mask.style.display = 'block';
    const mainContent = document.getElementById('main-content');
    const container = F.newElement('div', newProjectForm, '', 'temp');
    mainContent.appendChild(container);
    document.getElementById('new-project-name').focus();
    this.toggleNewProjectForm = true;
  },
  closeNewForm() {
    document.getElementById('new-project-form').reset();
    document.getElementById('temp').remove();
    const maskPage = document.getElementById('mask-page');
    maskPage.style.display = 'none';
    this.toggleNewProjectForm = false;
  },
  new() {
    const errorMsg = document.querySelector('.form-error');
    const nameInput = document.getElementById('new-project-name');
    const dateInput = document.getElementById('new-project-due-date');
    const name = nameInput.value;
    const dueDate = dateInput.value;
    // add project if form complete
    if (name !== '' && dueDate) {
      const newProject = {
        name: name,
        dueDate: dueDate,
        todoList: []
      }
      this.list.push(newProject);
      this.createNewProjectBtn();
      this.closeNewForm();
      return true;
    } else { // else handle input errors
      if (!name && !dueDate) {
        nameInput.style.outline = '3px solid var(--red)';
        dateInput.style.outline = '3px solid var(--red)';
        errorMsg.innerHTML = 'Please enter a name and due date for your project';
        errorMsg.style.display = 'block';
      } else if (name !== '' && !dueDate) {
          nameInput.style.outline = '1px solid black';
          dateInput.style.outline = '3px solid var(--red)';
          errorMsg.innerHTML = 'Please enter a due date for your project';
          errorMsg.style.display = 'block';
      } else if (name === '' && dueDate) {
          nameInput.style.outline = '3px solid var(--red)';
          dateInput.style.outline = '1px solid black';
          errorMsg.innerHTML = 'Please enter a name for your project';
          errorMsg.style.display = 'block';
      }
    }
    nameInput.addEventListener('input', function(e) {
      if (nameInput.value !== '') {
        nameInput.style.outline = '1px solid black';
      }
    });
    dateInput.addEventListener('input', function(e) {
      if (dateInput.value !== '') {
        dateInput.style.outline = '1px solid black';
      }
    });
  },
  createNewProjectBtn() {
    const newItem = this.list[this.list.length - 1];
    if (newItem.name && newItem.dueDate) {
      const id = this.list.length - 1;
      const date = F.dateToUKStr(newItem.dueDate);
      const btnDiv = F.newElement('div', '', ['project-btn'], `project-btn-div-${id}`);
      const nameP = F.newElement('p', `- ${newItem.name}`);
      const dateP = F.newElement('p', `${date}`);
        dateP.style.fontSize = '1.2rem';
        dateP.style.paddingTop = '2px';
      const newItemBtn = F.newElement('button', '', '', `project-btn-${id}`);
        newItemBtn.style.position = 'absolute';
        newItemBtn.style.top = '0';
        newItemBtn.style.left = '1px';
        newItemBtn.style.width = '100%';
        newItemBtn.style.height = '100%';
        newItemBtn.addEventListener('mouseenter', function() {
          btnDiv.style.backgroundColor = "var(--red)";
          nameP.style.color = '#ffffff';
          nameP.style.fontWeight = '600';
          dateP.style.color = '#ffffff';
          dateP.style.fontWeight = '600';
        });
        newItemBtn.addEventListener('mouseleave', function() {
          btnDiv.style.backgroundColor = "initial"; // or any other default color
          nameP.style.color = 'initial';
          nameP.style.fontWeight = 'initial';
          dateP.style.color = 'initial';
          dateP.style.fontWeight = 'initial';
        });
      btnDiv.appendChild(nameP);
      btnDiv.appendChild(dateP);
      btnDiv.appendChild(newItemBtn);
      const projectsList = document.getElementById('left-sidebar-projects');
      projectsList.appendChild(btnDiv);  
    }
  },

}

export { Projects }
