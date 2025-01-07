'use strict';
import './css/poppins.css';
import './css/reset.css';
import './css/styles.css';
import './css/nav.css';
import { navBar } from './js/nav.js';
import { greeting } from "./greeting.js";
import odinImage from "./img/odin-lined.png";

console.log(greeting);

navBar.addToDOM();

const contentDiv = document.getElementById('content');

const image = document.createElement("img");
image.src = odinImage;
contentDiv.appendChild(image);

// click events
const body = document.querySelector('body');
body.addEventListener('click', function(e) {
    const target = e.target;
    switch(target.id) {
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
        default:
          if (navBar.dropdownToggle === true) {
            navBar.closeDropdownMenu();
          }
          break;
    }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    if (navBar.dropdownToggle === true) {
      navBar.closeDropdownMenu();
    }
  }
});