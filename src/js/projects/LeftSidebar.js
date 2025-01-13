'use strict'
import { F } from '../Functions';
import { Projects } from '../Projects';
import { newProjectFormErrors } from './newProjectFormErrors';
import { Undo } from '../Undo';
import newProjectForm from '../../html/newProjectForm.html';

const LeftSidebar = {
  toggleNewProjectForm: false,
  toggleDelProjBtn: false,
  ctrlPressed: false,
  openNewProjectForm() { // formerly newForm
    F.addBackgroundMask(3000, '#000000', 0.4, true);
    const mainContent = document.getElementById('main-content');
    const formContainer = F.newElement('div', newProjectForm, '', 'temp');
    mainContent.appendChild(formContainer);
    document.getElementById('new-project-name').focus();
    this.toggleNewProjectForm = true;
  },
  closeNewProjectForm() { // formerly closeNewForm
    if (this.toggleNewProjectForm) {
      document.getElementById('new-project-form').reset();
      document.getElementById('temp').remove();
      F.removeBackgroundMask();
      this.toggleNewProjectForm = false;
    }
  },
  createNewProject() { // formerly new
    Undo.write(Projects.list);
    const nameInput = document.getElementById('new-project-name');
    const dateInput = document.getElementById('new-project-due-date');
    const name = nameInput.value;
    const dueDate = F.dateToUKStr(dateInput.value);
    if (newProjectFormErrors.handleNewProjectFormInputErrors(name, dueDate, nameInput, dateInput)) {
      if (name !== '' && dueDate) { // add new project if form complete
      const newProject = { name, dueDate, todoList: [] };
      Projects.list.push(newProject);
      Projects.currentProjId = Projects.list.length - 1;
      this.closeNewProjectForm();
      F.writeToLocalStorage('projectsList', Projects.list);
      this.createNewProjectBtn(Projects.list[Projects.currentProjId], Projects.currentProjId);
      this.updateCount();
      Projects.displayProjectContent(Projects.currentProjId);
      // console.log(`Stored Projects: ${F.getLocalStorageItem('projectsList')}`);
      return true;
      }
    }
  },
  createNewProjectBtn(project, id) {
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
      Projects.currentProjId = id;
      Projects.displayProjectContent(id);
    });
    // button.addEventListener('contextmenu', (event) => {
    //   console.log("🖱 right click detected!");
    //   event.preventDefault(); // Prevents the default context menu from appearing
    // });
  },
  updateCount() {
    const projectsBtn = document.getElementById('projects-btn');
    let count = Projects.list.length > 2 ? Projects.list.length - 2 : 0;
    projectsBtn.innerText = `Projects - ${count}`;
  },
  populateProjectsListDiv() {
    document.getElementById('left-sidebar-projects').innerHTML = '';
    for (let i = 2; i < Projects.list.length; i++) {
      LeftSidebar.createNewProjectBtn(Projects.list[i], i);
    }
  },
  deleteProjectEvent() {
    // Capture clicks on a specific element
    document.getElementById('left-sidebar-projects').addEventListener('click', (e) => {
      if (this.ctrlPressed) {
          this.toggleDelProjBtn = true;
          F.addBackgroundMask(3000, '#000000', 0.4, true);

          const clickId = e.target.id;
          const idSplit = clickId.split('-');
          const projectIndex = idSplit[2]
          const project = Projects.list[projectIndex];
          const parentId = `${idSplit[0]}-${idSplit[1]}-div-${idSplit[2]}`;
          let projectBtn = document.getElementById(parentId);

          const delBtnText = `Delete Project: ${F.reduceString(project.name, 15)}`;
          const delProjBtn = F.newElement('button', delBtnText, ['form-container'], 'del-proj-btn');
          document.body.appendChild(delProjBtn);

          delProjBtn.addEventListener('click', (e) => {
            Undo.write(Projects.list);
            projectBtn.remove();
            Projects.list.splice(projectIndex, 1);
            F.removeBackgroundMask();
            F.writeToLocalStorage('projectsList', Projects.list);
            this.closeDelProjBtn();

            // setTimeout(LeftSidebar.populateProjectsListDiv, 3000);
            window.location.reload(true);
          })
      }
    });
  },
  closeDelProjBtn() {
    document.getElementById('del-proj-btn').remove();
    F.removeBackgroundMask();
    this.toggleDelProjBtn = false;
  },


}

export { LeftSidebar };