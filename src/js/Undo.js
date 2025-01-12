'use strict'
import { Projects } from './Projects.js';
import { F } from './Functions.js';

const Undo = {
  // undoObj: Projects.list,
  history: [],
  maxLength: 20,
  storageKey: 'undoHistory',
  storageType: 'localStorage', // sessionStorage
  storage: undefined,
  storageAvailable: false,
  ctrlPressed: false,

  /**
   * Check if the given storage type is available.
   * @param {string} type - The storage type to check (e.g. 'localStorage', 'sessionStorage')
   * @returns {boolean} Whether the storage type is available
   */
  storageAvailable(type) {
    try {
      const storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      console.log('Local storage is available');
      this.storageAvailable = true;
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  /**
   * Set the type of storage to be used for undo history.
   * @param {string} type - The storage type (e.g. 'localStorage', 'sessionStorage')
   */
  setStorageType(type) {
    switch (type) {
      case 'localStorage':
        this.storage = localStorage;
        break;
      case 'systemStorage':
        this.storage = sessionStorage;
        break;
    }
  },
  /** * Remove oldest undo history items when the history array exceeds the 
   * maximum length. */
  manageLength() {
    if (!this.history || !this.maxLength) {
      console.error('Error: history or maxLength is missing');
      return;
    }
    if (typeof this.maxLength !== 'number' || this.maxLength < 0) {
      console.error('Error: maxLength must be a non-negative number');
      return;
    }
    while (this.history.length > this.maxLength) {
      this.history.shift();
    }
  },
  /**
   * Write item to undo history.
   * @param {any} type - The item to be written to the undo history
   */
  write(item) {
    if (!item) {
      console.log('Nothing to write to undo history')
    } else {
        this.history.push(item);
        this.manageLength();
        try {
          this.storage.setItem(this.storageKey, JSON.stringify(this.history));
        } catch (e) {
          console.error(e);
          console.log('Error writing undo history to storage');
        }
    }
  },
  


  /** * Clear the undo history array and storage. */
  clearHistory() {
    try {
      this.history = [];
      if (this.storageAvailable)
      this.storage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (e) {
      console.error(e);
    }
  },

  initialize(maxLength) {
    if (maxLength) {this.maxLength = maxLength}
    if (this.storageAvailable(this.storageType)) {
      this.setStorageType(this.storageType);
      if (this.storage.getItem(this.storageKey) !== null) {
        console.log(`${this.storageKey} exists in ${this.storageType}`);
        this.history = JSON.parse(this.storage.getItem(this.storageKey));
      } else {
        console.log(`${this.storageKey} does not exist in ${this.storageType}`);
        this.history = [];
        this.storage.setItem(this.storageKey, JSON.stringify(this.history));
      }
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Control') {
        this.ctrlPressed = true;
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Control') {
        this.ctrlPressed = false;
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'z' || e.key === 'Z') {
        const length = this.history.length
        if (length === 0) {
          alert('Nothing to undo');
        } else if (Projects.list === this.history[length - 1]) {
          alert('Nothing to undo');
        } else {
          if (length > 0) {
            this.update(this.history.pop());
            try {
              this.storage.setItem(this.storageKey, JSON.stringify(this.history));
            } catch (e) {
              console.error(e);
              console.log('Error writing undo history to storage');
            }
            window.location.reload(true);
          }
        }
      }
    });
  },
  update(lastItem) {
    Projects.list = lastItem;
    F.writeToLocalStorage('projectsList', Projects.list);
    console.log('Undo: Projects list restored')
  }
}

export { Undo };
