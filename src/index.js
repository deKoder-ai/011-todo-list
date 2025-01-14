'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import './css/nav.css';
import homeHtml from './html/home.html';
import { navBar } from './js/nav.js'; // z-index: 2000;
import { Todo } from './js/Todo.js';
import { F } from './js/Functions.js';
import { Projects } from './js/Projects.js';
import { LeftSidebar } from './js/projects/LeftSidebar.js';
import { Undo } from './js/Undo.js';
import { RestoreProjects } from './js/projects/restoreProjects.js';
import { deleteTask } from './js/projects/deleteTask.js';
// import { todoEdit } from './js/xx.js';
// import odinImage from "./img/odin-lined.png";

import { todoEdits } from './js/todoEdits.js';

import homeCss from './css/home.css';

// dev
const logClickedElement = true; // log target of all single clicks to console
const logKeydown = false; // log key pushed in keydown event
const logKeyup = false; // log key pushed in keyup event
F.clearBrowserStorage(''); // 'session' or 'local'
F.addOutlineToAllElements(false); // add outline to all boxes


document.addEventListener('DOMContentLoaded', () => {
  navBar.addToDOM();
  Undo.initialize();
  Undo.keyEvents(Projects.restore, Projects.list);

  // set Projects.list to projectsList stored in localstorage
  const loadProjects = F.getLocalStorageItem('projectsList');
  if (loadProjects) { Projects.list = loadProjects };
  console.log(`Projects List:`);
  console.log(Projects.list);
  console.log(`Local storage keys: ${localStorage.length}`);
  F.getLocalStorageKeys(true);

  // fill content element with homeHtml - this will be done conditionally later
  document.getElementById('content').innerHTML = homeHtml;

  LeftSidebar.updateCount();
  LeftSidebar.populateProjectsListDiv();
  LeftSidebar.deleteProjectEvent();

  // const pageContent = document.getElementById('content');
  Projects.displayProjectContent(0);
  
  todoEdits.events();

  // click events
  function handleClickLogic(e) {
    const target = e.target;
    switch(target.id) {
      // navigation events
      case 'dropdown-btn':
          if (navBar.dropdownToggle === false) {
            navBar.openDropdownMenu();
          } else if (navBar.dropdownToggle === true) {
            navBar.closeDropdownMenu();
          }
          break;
      case 'nav-btn-1':
      case 'dropdown-item-1':
        F.downloadTxtFile('projectsRestore', Projects.list, true);
        break;
      case 'nav-btn-2':
      case 'dropdown-item-2':
        RestoreProjects.openFileUploadForm();
        break;
      case 'nav-btn-3':
      case 'dropdown-item-3':
        console.log('Nav Link 3');
        break;
      case 'dropdown-item-4':
        console.log('Nav Link 4');
        break;

      // projects events
      case 'today-btn':
        Projects.displayProjectContent(0);
        break;
      case 'daily-btn':
        Projects.displayProjectContent(1);
        break;
      case 'projects-btn':
        console.log('projects-btn');
        break;
      case 'add-project-btn':
        LeftSidebar.openNewProjectForm();
        break;
      case 'close-np-form':
        LeftSidebar.closeNewProjectForm();
        break;
      case 'new-project-submit-btn':
          e.preventDefault();
          LeftSidebar.createNewProject();
          // console.log(Projects.list);
        break;
      
      // add tasks to project
      case 'add-task-btn':
        Todo.newForm();
        break;
      case 'close-nt-form':
        Todo.closeNewForm();
        break;
      case 'new-task-submit-btn':
        e.preventDefault();
        Todo.new();
        break;
      case 'close-restore-form':
        RestoreProjects.closeFileUploadForm();
        break;




      case 'bcg-mask':
        if (Projects.toggleTitleEdit) { Projects.closeEditTitle(); }
        if (Projects.toggleDateEdit) { Projects.closeEditDate(); }
        if (LeftSidebar.toggleNewProjectForm) { LeftSidebar.closeNewProjectForm(); }
        if (LeftSidebar.toggleDelProjBtn) { LeftSidebar.closeDelProjBtn(); }
        if (Todo.toggleNewForm) { Todo.closeNewForm(); }
        if (RestoreProjects.toggleFileUploadForm) { RestoreProjects.closeFileUploadForm(); }
        break;
      default:
        if (navBar.dropdownToggle) { navBar.closeDropdownMenu(); }
        if (Projects.toggleDateEdit) { Projects.closeEditDate(); }
        break;
    }
    const del = target.id.slice(0, 3);
    if (del === 'del') {
      deleteTask(target.id);
    }
    
  }
  new F.EventHandler(handleClickLogic, 'click', logClickedElement);

  // keydown events
  function handleKeydownLogic(e) {
    switch(e.key) {
      case 'Escape':
        if (document.getElementById('bcg-mask')) { F.removeBackgroundMask(); }
        if (navBar.dropdownToggle) { navBar.closeDropdownMenu(); }
        if (Projects.toggleTitleEdit) { Projects.closeEditTitle(); }
        if (Projects.toggleDateEdit) { Projects.closeEditDate(); }
        if (LeftSidebar.toggleNewProjectForm) { LeftSidebar.closeNewProjectForm(); }
        if (LeftSidebar.toggleDelProjBtn) { LeftSidebar.closeDelProjBtn(); }
        if (RestoreProjects.toggleFileUploadForm) { RestoreProjects.closeFileUploadForm(); }
        if (Todo.toggleNewForm) { Todo.closeNewForm(); }
        break;
      case 'n':
      case 'N':
        if (e.altKey) {
          LeftSidebar.openNewProjectForm();
        }
        break;
      case 't':
      case 'T':
        if (e.altKey) {
          Todo.newForm();
        }
        break;
      case 'Enter':
        if (Projects.toggleTitleEdit) { 
          F.removeBackgroundMask();
          Projects.changeTitle() 
        };
        // if (Projects.toggleDateEdit) { 
        //   F.removeBackgroundMask();
        //   Projects.changeDate() 
        // };
        break;
    }
  }
  new F.EventHandler(handleKeydownLogic, 'keydown', logKeydown);
  

  // function x() {
  //   let a = 2;
  // }
  // new F.EventHandler(x, 'contextmenu', true, true);

});

