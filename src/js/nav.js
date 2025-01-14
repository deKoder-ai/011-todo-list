'use-strict'
import { F } from './Functions.js';

const navBar = {
  navBar: document.getElementById('nav-bar'),
  homeBtn: F.htmlElement('button', 'Home', '' ,'home-btn'),
  gap: F.htmlElement('div'),
  buttons: [
    F.htmlElement('button', 'Save', ['nav-bar-btn'], 'nav-btn-1'),
    F.htmlElement('button', 'Restore', ['nav-bar-btn'], 'nav-btn-2'),
    F.htmlElement('button', 'Docs', ['nav-bar-btn'], 'nav-btn-3'),
  ],
  dropdownBtn: F.htmlElement('button', '', '', 'dropdown-btn'),
  dropdownMenu: F.htmlElement('div', '', '', 'dropdown-menu'),
  dropdownItems: [
    F.htmlElement('button', 'Save Projects', ['dropdown-items'], 'dropdown-item-1'),
    F.htmlElement('div', '', ['dropdown-separator']),
    F.htmlElement('button', 'Restore Projects', ['dropdown-items'], 'dropdown-item-2'),
    F.htmlElement('div', '', ['dropdown-separator']),
    F.htmlElement('button', 'Documentation', ['dropdown-items'], 'dropdown-item-3'),
    F.htmlElement('div', '', ['dropdown-separator']),
    F.htmlElement('button', 'Link 4', ['dropdown-items'], 'dropdown-item-4'),
    F.htmlElement('div', '', ['dropdown-separator']),
  ],
  dropdownToggle: false,
  openDropdownMenu: function() {
    this.dropdownMenu.style.display = 'block';
    this.dropdownMenu.style.zIndex = '200000';
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

