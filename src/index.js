'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import './css/nav.css';
import { navBar } from './js/nav.js';
import { Todo } from './js/Todo.js';
import { F } from './js/Functions.js';
import { Projects } from './js/Projects.js';
import { Undo } from './js/Undo.js';
// import { todoEdit } from './js/xx.js';
// import odinImage from "./img/odin-lined.png";

import { todoEdits } from './js/todoEdits.js';

import homeHtml from './html/home.html';
import homeCss from './css/home.css';

const logClickedElement = 0; // 0 - no log | 1 - log element

// Projects.list = Undo.history[Undo.history.length - 1];

// localStorage.clear();



const contentDiv = document.getElementById('content');

// const image = document.createElement("img");
// image.src = odinImage;
// contentDiv.appendChild(image);



document.addEventListener('DOMContentLoaded', function() {
  navBar.addToDOM();
  Undo.initialize();
  Undo.keyEvents(Projects.restore, Projects.list);

  //check if local storage available
  // lsAvailable = F.storageAvailable('localStorage');
  // clear undo history on load
  // if (lsAvailable) { Undo.clearHistory(); }

  // set Projects.list to projectsList stored in localstorage
  const loadProjects = F.getLocalStorageItem('projectsList');
  if (loadProjects) { Projects.list = loadProjects };
  console.log(`Projects List :`);
  console.log(Projects.list);
  // const loadUndoHistory = F.getLocalStorageItem('undoHistory');
  // if (loadUndoHistory) { Projects.undoHistory = loadUndoHistory};
  // console.log(`Undo History: `)
  // console.log(Projects.undoHistory);
  console.log(F.getLocalStorageKeys());


  // fill content element with homeHtml - this will be done conditionally later
  document.getElementById('content').innerHTML = homeHtml;

  Projects.updateCount();
  Projects.populateProjectsListDiv();


  Projects.delete();
  


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
            console.log('Nav Link 1');
            break;
          case 'nav-btn-2':
          case 'dropdown-item-2':
            console.log('Nav Link 2');
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
            Projects.newForm();
            break;
          case 'close-np-form':
            Projects.closeNewForm();
            break;
          case 'new-project-submit-btn':
              e.preventDefault();
              Projects.new();
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




          case 'mask-page':
            if (Projects.toggleNewForm === true) {
              Projects.closeNewForm();
            } else if (Todo.toggleNewForm === true) {
              Todo.closeNewForm();
            }
            break;
          default:
            if (navBar.dropdownToggle === true) {
              navBar.closeDropdownMenu();
            }
            break;
      }
  });



  
  



});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (navBar.dropdownToggle === true) {
      navBar.closeDropdownMenu();
    } else if (Projects.toggleNewForm === true) {
      Projects.closeNewForm();
    } else if (Todo.toggleNewForm === true) {
      Todo.closeNewForm();
    }
  } else if (e.key === '+') {
    Projects.newForm();
  }
});