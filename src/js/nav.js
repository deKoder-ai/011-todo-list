'use-strict'
import { newElement } from './functions.js';

const navBar = {
  navBar: document.getElementById('nav-bar'),
  homeBtn: newElement('button', 'Home', '' ,'home-btn'),
  gap: newElement('div'),
  buttons: [
    newElement('button', 'About', ['nav-bar-btn'], 'nav-btn-1'),
    newElement('button', 'Link 2', ['nav-bar-btn'], 'nav-btn-2'),
    newElement('button', 'Link 3', ['nav-bar-btn'], 'nav-btn-3'),
  ],
  dropdownBtn: newElement('button', '', '', 'dropdown-btn'),
  dropdownMenu: newElement('div', '', '', 'dropdown-menu'),
  dropdownItems: [
    newElement('button', 'Link 1', ['dropdown-items'], 'dropdown-item-1'),
    newElement('div', '', ['dropdown-separator']),
    newElement('button', 'Link 2', ['dropdown-items'], 'dropdown-item-2'),
    newElement('div', '', ['dropdown-separator']),
    newElement('button', 'Link 3', ['dropdown-items'], 'dropdown-item-3'),
    newElement('div', '', ['dropdown-separator']),
    newElement('button', 'Link 4', ['dropdown-items'], 'dropdown-item-4'),
    newElement('div', '', ['dropdown-separator']),
  ],
  dropdownToggle: false,
  openDropdownMenu: function() {
    this.dropdownMenu.style.display = 'block';
    this.dropdownToggle = true;
  },
  closeDropdownMenu: function() {
    this.dropdownMenu.style.display = 'none';
    this.dropdownToggle = false;
  },
  addToDOM: function() {
    this.navBar.appendChild(this.homeBtn);
    this.navBar.appendChild(this.gap);
    for (const button of this.buttons) {
      this.navBar.appendChild(button);
    }
    this.navBar.appendChild(this.dropdownBtn);
    const ddBtn = this.dropdownBtn;
    for (const item of this.dropdownItems) {
      this.dropdownMenu.appendChild(item);
    }
    this.navBar.appendChild(this.dropdownMenu);
  },
}

export { navBar };

