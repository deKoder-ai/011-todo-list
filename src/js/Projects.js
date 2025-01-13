import { F } from './Functions.js';
import newProjectForm from '../html/newProjectForm.html';
import { Todo } from './Todo.js';
import { Undo } from './Undo.js';
import { Errors } from './projects/newProjectFormErrors.js';
import { LeftSidebar } from './projects/LeftSidebar.js';

const Projects = {
  currentProjId: 0,
  list: [
    {name: 'Today', dueDate: F.getDate(), todoList: []},
    {name: 'Daily', dueDate: F.getDate(), todoList: []}
  ],
  toggleNewForm: false,

  toggleTitleEdit: false,
  toggleDateEdit: false,
  mask: undefined,
  ctrlPressed: false,

  addMaskToDOM() {
    if (!this.mask) {
      const content = document.getElementById('main-content');
      this.mask = F.newElement('div', '', ['mask-bcg'], 'mask-bcg');
      document.body.classList.add('overflow-hidden');
      this.mask.addEventListener('click', (e) => {
        if (e.target.id === 'mask-bcg') {
          if (this.toggleNewForm) {
            this.closeNewForm();
          } else if (this.toggleDelProjBtn) {
            this.closeDelProjBtn();
          } else if (this.toggleTitleEdit) {
            this.closeEditTitle();
          }
        }
        document.body.classList.remove('overflow-hidden');
      });
      content.appendChild(this.mask);
    }
  },
  removeMask() {
    this.mask.remove();
    document.body.classList.remove('overflow-hidden');
    this.mask = undefined;
  },

  
  
  editTitleKeydown(e, titleEditInput, projectTitle) {
    if (e.key === 'Enter') {
      const newName = titleEditInput.value;
      projectTitle.innerText = newName;
      this.list[Projects.currentProjId].name = newName;
      F.writeToLocalStorage('projectsList', this.list);
      LeftSidebar.populateProjectsListDiv();
      this.closeEditTitle();
    } else if (e.key === 'Escape') {
      console.log('esc');
      this.closeEditTitle();
    }
  },
  editTitleEvent() {
    this.toggleTitleEdit = true;
    console.log(this.toggleTitleEdit);
    const projectTitle = document.getElementById('project-title');
    this.addMaskToDOM();
    const mainContent = document.getElementById('main-content');
    const titleEditInput = F.newElement('input', 'x', ['form-container'], 'project-title-edit');
    titleEditInput.value = projectTitle.innerText;
    mainContent.appendChild(titleEditInput);
    titleEditInput.focus();
    // titleEditInput.select();

    titleEditInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const newName = titleEditInput.value;
        projectTitle.innerText = newName;
        this.list[Projects.currentProjId].name = newName;
        F.writeToLocalStorage('projectsList', this.list);
        this.populateProjectsListDiv();
        this.closeEditTitle(titleEditInput);
      }    
    });


  },
  editTitle() {
    const projectTitle = document.getElementById('project-title');
    projectTitle.addEventListener('dblclick', (e, editTitleEvent) => {
      this.editTitleEvent();
    });
  },
  closeEditTitle(titleEditInput) {
    console.log('wtf');
    document.body.focus();
    titleEditInput = undefined;
    console.log(titleEditInput);
    this.removeMask();
    this.toggleTitleEdit = false;
  },
  displayProjectContent(id) {
    this.editTitle();
    this.currentProjId = id;
    const projectTitle = document.getElementById('project-title');
    const mainDueDate = document.getElementById('main-due-date');
    const dateHead = document.getElementById('date-head');
    // this.editProjectDateClick(mainDueDate, editProjectDate());
    projectTitle.innerText = this.list[id].name;
    mainDueDate.innerText = this.list[id].dueDate;
    const todoListHtml = document.getElementById('todo-list');
    todoListHtml.innerHTML = '';
    const todoList = this.list[this.currentProjId].todoList;
    for (const item of todoList) {
      Todo.appendTaskToDOM(item);
    }
  },
  editProjectDate() {
    const dateHead = document.getElementById('date-head');
    const dateEdit = document.getElementById('main-due-date-edit');
    this.toggleDateEdit = true;
    dateHead.style.display = 'block';
    dateEdit.style.display = 'block';
  },
  editProjectDateClick(mainDueDate) {
    dateHead.addEventListener('dblclick', (e, editProjectDate) => {
      // editProjectDate();
      console.log('hey');
    });
  },




  restore(lastItem) {
    Projects.list = lastItem;
    F.writeToLocalStorage('projectsList', Projects.list);
    LeftSidebar.populateProjectsListDiv();
    LeftSidebar.updateCount();
    const projectTitle = document.getElementById('project-title');
    console.log(Projects.list);
    projectTitle.innerText = Projects.list[Projects.currentProjId].name;
    console.log(Projects.list[Projects.currentProjId].name);
  },
}

export { Projects }
