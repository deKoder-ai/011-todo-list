import { F } from './Functions.js';
import newProjectForm from '../html/newProjectForm.html';
import { Todo } from './Todo.js';

const Projects = {
  currentProjId: 0,
  list: [
    {name: 'Today', dueDate: F.getDate(), todoList: []},
    {name: 'Daily', dueDate: F.getDate(), todoList: []}
  ],
  toggleNewForm: false,
  mask: undefined,
  updateCount() {
    const projectsBtn = document.getElementById('projects-btn');
    let count = 0;
    if (this.list.length > 2) { count = this.list.length - 2}
    projectsBtn.innerText = `Projects - ${count}`;
  },
  addMaskToDOM() {
    const content = document.getElementById('content');
    this.mask = F.newElement('div', '', ['mask-bcg'], 'mask-bcg');
    this.mask.addEventListener('click', function(e) {
      if (e.target.id === 'mask-bcg') {
        Projects.closeNewForm();
      }
    });
    content.appendChild(this.mask);
  },
  removeMask() {
    this.mask.remove();
    this.mask = undefined;
  },
  newForm() {
    // const mask = document.getElementById('mask-page');
    // mask.style.display = 'block';
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
    // const maskPage = document.getElementById('mask-page');
    // maskPage.style.display = 'none';
    console.log(this.mask);
    this.removeMask();
    this.toggleNewForm = false;
  },
  new() {
    const errorMsg = document.querySelector('.form-error');
    const nameInput = document.getElementById('new-project-name');
    const dateInput = document.getElementById('new-project-due-date');
    const name = nameInput.value;
    const dueDate = F.dateToUKStr(dateInput.value);
    // add project if form complete
    if (name !== '' && dueDate) {
      const newProject = {
        name,
        dueDate,
        todoList: []
      }
      this.currentProjId = name;
      this.list.push(newProject);
      this.currentProjId = this.list.length - 1;
      this.displayProject(this.currentProjId);
      this.createNewBtn(this.list[this.currentProjId], this.currentProjId);
      this.closeNewForm();
      F.writeToLocalStorage('projectsList', Projects.list);
      this.updateCount();
      // console.log(`Stored Projects: ${F.getLocalStorageItem('projectsList')}`);
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
      const projectsList = document.getElementById('left-sidebar-projects');
      projectsList.appendChild(btnDiv);  
    }
  },
  addBtnEvents(button, components, id) {
    button.addEventListener('mouseenter', function() {
      for (let comp of components) { comp.classList.add('project-btn-hover'); }
    });
    button.addEventListener('mouseleave', function() {
      for (let comp of components) { comp.classList.remove('project-btn-hover'); }
    });
    button.addEventListener('click', function(e) {
      Projects.currentProjId = id;
      Projects.displayProject(id);
      console.log(Projects.list[id]);
    });
    // button.addEventListener('contextmenu', (event) => {
    //   console.log("🖱 right click detected!");
    //   event.preventDefault(); // Prevents the default context menu from appearing
    // });
  },
  displayProject(id) {
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


  delete() {
    let ctrlPressed = false;
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Control') {
          ctrlPressed = true;
      }
    });
    document.addEventListener('keyup', function(e) {
      if (e.key === 'Control') {
          ctrlPressed = false;
      }
    });
    // Capture clicks on a specific element
    document.getElementById('left-sidebar-projects').addEventListener('click', function(e) {
      if (ctrlPressed) {
          console.log('Control+Click detected');

          Projects.mask = F.newElement('div', '', ['mask-bcg'], 'mask-bcg');

          // close mask and delete button
          Projects.mask.addEventListener('click', function(e) {
            if (e.target.id === 'mask-bcg') {
              console.log('killdembugs');
              Projects.mask.remove();
              Projects.mask = undefined;
            }
          });
          document.body.appendChild(Projects.mask);

          const clickId = e.target.id;
          const idSplit = clickId.split('-');
          const projectIndex = idSplit[2]
          const project = Projects.list[projectIndex];
          const parentId = `${idSplit[0]}-${idSplit[1]}-div-${idSplit[2]}`;
          let projectBtn = document.getElementById(parentId);

          const delBtnText = `Delete Project: ${F.reduceString(project.name, 15)}`;
          const delProjBtn = F.newElement('button', delBtnText, '', 'del-proj-btn');
          Projects.mask.appendChild(delProjBtn);
          delProjBtn.addEventListener('click', function(e) {
            Projects.undoHistory.push(Projects.list);
            F.writeToLocalStorage('undoHistory', Projects.undoHistory);
            projectBtn.remove();
            projectBtn = undefined;
            Projects.list.splice(projectIndex, 1);
            Projects.mask.remove();
            Projects.mask = undefined;
            F.writeToLocalStorage('projectsList', Projects.list);
            window.location.reload(true);
          })
      }
    });
  },
  undoHistory: [

  ],
}

export { Projects }
