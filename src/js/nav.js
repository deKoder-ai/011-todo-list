'use-strict'
import { F } from './Functions.js';

const navBar = {
  navBar: document.getElementById('nav-bar'),
  homeBtn: F.newElement('button', 'Home', '' ,'home-btn'),
  gap: F.newElement('div'),
  buttons: [
    F.newElement('button', 'About', ['nav-bar-btn'], 'nav-btn-1'),
    F.newElement('button', 'Link 2', ['nav-bar-btn'], 'nav-btn-2'),
    F.newElement('button', 'Link 3', ['nav-bar-btn'], 'nav-btn-3'),
  ],
  dropdownBtn: F.newElement('button', '', '', 'dropdown-btn'),
  dropdownMenu: F.newElement('div', '', '', 'dropdown-menu'),
  dropdownItems: [
    F.newElement('button', 'Link 1', ['dropdown-items'], 'dropdown-item-1'),
    F.newElement('div', '', ['dropdown-separator']),
    F.newElement('button', 'Link 2', ['dropdown-items'], 'dropdown-item-2'),
    F.newElement('div', '', ['dropdown-separator']),
    F.newElement('button', 'Link 3', ['dropdown-items'], 'dropdown-item-3'),
    F.newElement('div', '', ['dropdown-separator']),
    F.newElement('button', 'Link 4', ['dropdown-items'], 'dropdown-item-4'),
    F.newElement('div', '', ['dropdown-separator']),
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

