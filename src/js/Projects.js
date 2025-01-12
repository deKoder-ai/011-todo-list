import { F } from './Functions.js';
import newProjectForm from '../html/newProjectForm.html';
import { Todo } from './Todo.js';
import { Undo } from './Undo.js';
import { Errors } from './handleFormErrors.js';

const Projects = {
  currentProjId: 0,
  list: [
    {name: 'Today', dueDate: F.getDate(), todoList: []},
    {name: 'Daily', dueDate: F.getDate(), todoList: []}
  ],
  toggleNewForm: false,
  toggleDelProjBtn: false,
  mask: undefined,
  ctrlPressed: false,
  updateCount() {
    const projectsBtn = document.getElementById('projects-btn');
    let count = this.list.length > 2 ? this.list.length - 2 : 0;
    projectsBtn.innerText = `Projects - ${count}`;
  },
  addMaskToDOM() {
    const content = document.getElementById('content');
    this.mask = F.newElement('div', '', ['mask-bcg'], 'mask-bcg');
    this.mask.addEventListener('click', (e) => {
      if (e.target.id === 'mask-bcg') {
        if (this.toggleNewForm) {
          this.closeNewForm();
        } else if (this.toggleDelProjBtn) {
          this.closeDelProjBtn();
        }
      }
    });
    content.appendChild(this.mask);
  },
  newForm() {
    this.addMaskToDOM();
    const mainContent = document.getElementById('main-content');
    const container = F.newElement('div', newProjectForm, '', 'temp');
    mainContent.appendChild(container);
    document.getElementById('new-project-name').focus();
    this.toggleNewForm = true;
  },
  closeNewForm() {
    document.getElementById('new-project-form').reset();
    document.getElementById('temp').remove();
    this.mask.remove();
    this.toggleNewForm = false;
  },
  
  new() {
    const nameInput = document.getElementById('new-project-name');
    const dateInput = document.getElementById('new-project-due-date');
    const name = nameInput.value;
    const dueDate = F.dateToUKStr(dateInput.value);

    if (Errors.handleNewProjectFormInputErrors(name, dueDate, nameInput, dateInput)) {
      if (name !== '' && dueDate) { // add new project if form complete
      const newProject = { name, dueDate, todoList: [] };
      this.currentProjId = name;
      this.list.push(newProject);
      this.currentProjId = this.list.length - 1;
      this.displayProjectContent(this.currentProjId);
      this.createNewBtn(this.list[this.currentProjId], this.currentProjId);
      this.closeNewForm();
      F.writeToLocalStorage('projectsList', this.list);
      Undo.write(this.list);
      this.updateCount();
      // console.log(`Stored Projects: ${F.getLocalStorageItem('projectsList')}`);
      return true;
      }
    }
  },
  createNewBtn(project, id) {
    if (project.name && project.dueDate) {
      const date = project.dueDate;
      const btnDiv = F.newElement('div', '', ['project-btn-div'], `project-btn-div-${id}`);
      const appendProjName = F.reduceString(project.name, 14);
      const nameP = F.newElement('p', `- ${appendProjName}`);
      const dateP = F.newElement('p', `${date}`, ['project-btn-date-p']);
      const newItemBtn = F.newElement('button', '', ['project-btn'], `project-btn-${id}`);
      const components = [btnDiv, nameP, dateP];
      this.addBtnEvents(newItemBtn, components, id);
      btnDiv.appendChild(nameP);
      btnDiv.appendChild(dateP);
      btnDiv.appendChild(newItemBtn);
      document.getElementById('left-sidebar-projects').appendChild(btnDiv);  
    }
  },
  addBtnEvents(button, components, id) {
    button.addEventListener('mouseenter', (e) => {
      for (let comp of components) { comp.classList.add('project-btn-hover'); }
    });
    button.addEventListener('mouseleave', (e) => {
      for (let comp of components) { comp.classList.remove('project-btn-hover'); }
    });
    button.addEventListener('click', (e) => {
      this.currentProjId = id;
      this.displayProjectContent(id);
      console.log(this.list[id]);
    });
    // button.addEventListener('contextmenu', (event) => {
    //   console.log("🖱 right click detected!");
    //   event.preventDefault(); // Prevents the default context menu from appearing
    // });
  },
  displayProjectContent(id) {
    this.currentProjId = id;
    const projectTitle = document.getElementById('project-title');
    const mainDueDate = document.getElementById('main-due-date');
    projectTitle.innerText = this.list[id].name;
    mainDueDate.innerText = this.list[id].dueDate;
    const todoListHtml = document.getElementById('todo-list');
    todoListHtml.innerHTML = '';
    const todoList = this.list[this.currentProjId].todoList;
    for (const item of todoList) {
      Todo.appendTaskToDOM(item);
    }
  },
  populateProjectsListDiv() {
    document.getElementById('left-sidebar-projects').innerHTML = '';
    for (let i = 2; i < this.list.length; i++) {
      this.createNewBtn(this.list[i], i);
    }
  },


  deleteEvent() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Control') {
          this.ctrlPressed = true;
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Control') {
          this.ctrlPressed = false;
      }
    });
    // Capture clicks on a specific element
    document.getElementById('left-sidebar-projects').addEventListener('click', (e) => {
      if (this.ctrlPressed) {
          this.toggleDelProjBtn = true;
          this.addMaskToDOM();

          const clickId = e.target.id;
          const idSplit = clickId.split('-');
          const projectIndex = idSplit[2]
          const project = this.list[projectIndex];
          const parentId = `${idSplit[0]}-${idSplit[1]}-div-${idSplit[2]}`;
          let projectBtn = document.getElementById(parentId);

          const delBtnText = `Delete Project: ${F.reduceString(project.name, 15)}`;
          const delProjBtn = F.newElement('button', delBtnText, '', 'del-proj-btn');
          this.mask.appendChild(delProjBtn);
          delProjBtn.addEventListener('click', (e) => {

            Undo.write(this.list);
            
            projectBtn.remove();
            this.list.splice(projectIndex, 1);
            this.mask.remove();
            F.writeToLocalStorage('projectsList', this.list);
            
            // this.populateProjectsListDiv();
            window.location.reload(true);
          })
      }
    });
  },
  closeDelProjBtn() {
    document.getElementById('del-proj-btn').remove();
    this.mask.remove();
    this.toggleDelProjBtn = true;
  },
  restore(lastItem) {
    Projects.list = lastItem;
    F.writeToLocalStorage('projectsList', Projects.list);
    Projects.populateProjectsListDiv();
    Projects.updateCount();
  },
}

export { Projects }
