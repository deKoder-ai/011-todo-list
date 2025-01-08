'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import './css/nav.css';
import { navBar } from './js/nav.js';
import { greeting } from "./greeting.js";
import { todo } from './js/todo.js';
import { getDate } from './js/functions.js';
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

  const projectTitle = document.getElementById('project-title');
  const mainDueDate = document.getElementById('main-due-date');


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
          case 'daily-btn':
            projectTitle.innerText = 'Daily';
            mainDueDate.innerText = getDate();
            break;
          case 'today-btn':
            projectTitle.innerText = 'Today';
            mainDueDate.innerText = getDate();
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
    }
  }
});