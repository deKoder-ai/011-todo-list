'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import './css/nav.css';
import { navBar } from './js/nav.js';
import { greeting } from "./greeting.js";
import { todo } from './js/todo.js';
import { getDate } from './js/functions.js';
import { Projects } from './js/Projects.js';
// import odinImage from "./img/odin-lined.png";

import homeHtml from './html/home.html';
import homeCss from './css/home.css';

navBar.addToDOM();

const contentDiv = document.getElementById('content');

// const image = document.createElement("img");
// image.src = odinImage;
// contentDiv.appendChild(image);

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('content').innerHTML = homeHtml;
  const k = todo.item('Name', 'Description', 'Due', 'Priority', 'Notes');
  todo.addToDOM(k);

  // const pageContent = document.getElementById('content');
  const projectTitle = document.getElementById('project-title');
  const mainDueDate = document.getElementById('main-due-date');
  projectTitle.innerText = Projects.today.name;
  mainDueDate.innerText = Projects.today.dueDate;

  // click events
  const body = document.querySelector('body');
  body.addEventListener('click', function(e) {
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

          //
          case 'today-btn':
            projectTitle.innerText = Projects.today.name;
            mainDueDate.innerText = Projects.today.dueDate;
            break;
          case 'daily-btn':
            projectTitle.innerText = Projects.daily.name;
            mainDueDate.innerText = Projects.daily.dueDate;
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

            break;

          default:
            if (navBar.dropdownToggle === true) {
              navBar.closeDropdownMenu();
            }
            break;
      }
  });




});








document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (navBar.dropdownToggle === true) {
      navBar.closeDropdownMenu();
    } else if (Projects.toggleNewProjectForm === true) {
      Projects.closeNewForm();
    }
  }
});