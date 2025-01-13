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
// import { todoEdit } from './js/xx.js';
// import odinImage from "./img/odin-lined.png";

import { todoEdits } from './js/todoEdits.js';


import homeCss from './css/home.css';

const logClickedElement = 0; // 0 - no log | 1 - log element
if (false) { localStorage.clear(); };


const contentDiv = document.getElementById('content');

let ctrlIsPressed = false;
let altIsPressed = false;

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
  const body = document.querySelector('body');
  body.addEventListener('click', function(e) {
      const target = e.target;
      if (logClickedElement) {console.log(target)};
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
            if (LeftSidebar.toggleNewProjectForm) { LeftSidebar.closeNewProjectForm(); }
            if (LeftSidebar.toggleDelProjBtn) { LeftSidebar.closeDelProjBtn(); }
            if (Todo.toggleNewForm) { Todo.closeNewForm(); }
            if (RestoreProjects.toggleFileUploadForm) { RestoreProjects.closeFileUploadForm(); }
            break;
          default:
            if (navBar.dropdownToggle) {
              navBar.closeDropdownMenu();
            }
            break;
      }
  });

  // keyboard events
  document.addEventListener('keydown', (e) => {
    // console.log(e.key);
    switch(e.key) {
      case 'Alt':
        altIsPressed = true;
        break;
      case 'Control':
        ctrlIsPressed = true;
        LeftSidebar.ctrlPressed = true;
        break;
      case 'Escape':
        if (document.getElementById('bcg-mask')) { F.removeBackgroundMask(); }
        if (navBar.dropdownToggle) { navBar.closeDropdownMenu(); }
        if (LeftSidebar.toggleNewProjectForm) { LeftSidebar.closeNewProjectForm(); }
        if (Projects.toggleTitleEdit) { Projects.closeEditTitle(); }
        if (LeftSidebar.toggleDelProjBtn) { LeftSidebar.closeDelProjBtn(); }
        if (Todo.toggleNewForm) { Todo.closeNewForm(); }
        if (RestoreProjects.toggleFileUploadForm) { RestoreProjects.closeFileUploadForm(); }
      case 'n':
      case 'N':
        if (altIsPressed) {
          LeftSidebar.openNewProjectForm();
        }
    }
  });
  
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Alt') { altIsPressed = false };
    if (e.key === 'Control') { 
      ctrlIsPressed = false;
      LeftSidebar.ctrlPressed = false;
    }
  });

});

