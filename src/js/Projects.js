import { F } from './Functions.js';
import { Todo } from './Todo.js';
import { Undo } from './Undo.js';
import { LeftSidebar } from './projects/LeftSidebar.js';

const Projects = {
  currentProjId: 0,
  list: [
    {name: 'Today', dueDate: F.getDate(), todoList: []},
    {name: 'Daily', dueDate: F.getDate(), todoList: []}
  ],

  toggleTitleEdit: false,
  toggleDateEdit: false,

  displayProjectContent(id) {
    this.editTitle();
    this.editDate();
    this.currentProjId = id;
    const projectTitle = document.getElementById('project-title');
    const dateHead = document.getElementById('date-head');
    projectTitle.innerText = this.list[id].name;
    dateHead.innerText = `Due Date: ${this.list[id].dueDate}`;
    const todoListHtml = document.getElementById('todo-list');
    todoListHtml.innerHTML = '';
    const todoList = this.list[this.currentProjId].todoList;
    for (let i = 0; i < todoList.length; i++) {
      Todo.appendTaskToDOM(todoList[i], i);
    }
  },

  editTitle() {
    const projectTitle = document.getElementById('project-title');
    projectTitle.addEventListener('dblclick', () => {
      this.toggleTitleEdit = true;
      F.addBackgroundMask(3000, '#000000', 0, true);
      const projectTitle = document.getElementById('project-title');
      const editTitleInput = document.getElementById('project-title-edit');
      projectTitle.style.display = 'none';
      editTitleInput.style.display = 'block';
      editTitleInput.value = projectTitle.innerText;
      editTitleInput.focus();
      editTitleInput.select();
    });
  },
  changeTitle() {
    const projectTitle = document.getElementById('project-title');
    const editTitleInput = document.getElementById('project-title-edit');
    Undo.write(Projects.list);
    const newName = editTitleInput.value;
    projectTitle.innerText = newName;
    Projects.list[Projects.currentProjId].name = newName;
    F.writeToLocalStorage('projectsList', this.list);
    LeftSidebar.populateProjectsListDiv();
    this.closeEditTitle();
  },
  closeEditTitle() {
    F.removeBackgroundMask();
    const projectTitle = document.getElementById('project-title');
    const editTitleInput = document.getElementById('project-title-edit');
    projectTitle.style.display = 'block';
    editTitleInput.style.display = 'none';
    this.toggleTitleEdit = false;
  },
  editDate() {
    const dateHead = document.getElementById('date-head');
    dateHead.addEventListener('dblclick', () => {
      this.toggleDateEdit = true;
      F.addBackgroundMask(3000, '#000000', 0, true);
      const dateHead = document.getElementById('date-head');
      const editDateInput = document.getElementById('main-due-date-edit');
      dateHead.style.display = 'none';
      editDateInput.style.display = 'block';
      // editDateInput.showPicker();
      document.getElementById('main-due-date-edit').addEventListener('change', () => {
        Undo.write(this.list);
        let newDate = this.value;
        newDate = F.dateToUKStr(editDateInput.value);
        dateHead.innerText = `Due Date: ${newDate}`;
        this.list[this.currentProjId].dueDate = newDate;
        F.writeToLocalStorage('projectsList', this.list);
        LeftSidebar.populateProjectsListDiv();
        this.closeEditDate();
      });
    });
  },
  closeEditDate() {
    F.removeBackgroundMask();
    const dateHead = document.getElementById('date-head');
    const editDateInput = document.getElementById('main-due-date-edit');
    dateHead.style.display = 'block';
    editDateInput.style.display = 'none';
    this.toggleDateEdit = false;
  },

  restore(lastItem) {
    Projects.list = lastItem;
    F.writeToLocalStorage('projectsList', Projects.list);
    LeftSidebar.populateProjectsListDiv();
    LeftSidebar.updateCount();
    // todos
    const todoListHtml = document.getElementById('todo-list');
    todoListHtml.innerHTML = '';
    const todoList = Projects.list[Projects.currentProjId].todoList;
    for (let i = 0; i < todoList.length; i++) {
      Todo.appendTaskToDOM(todoList[i], i);
    }

    const projectTitle = document.getElementById('project-title');
    console.log(Projects.list);
    projectTitle.innerText = Projects.list[Projects.currentProjId].name;
    console.log(Projects.list[Projects.currentProjId].name);
  },
}

export { Projects }
