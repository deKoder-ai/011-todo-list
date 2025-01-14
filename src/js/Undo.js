'use strict'
const Undo = {
  history: [],
  maxLength: 20,
  storageKey: 'undoHistory',
  storageType: 'localStorage', // sessionStorage
  storageAvailable: false,
  storage: undefined,
  /**
   * Set the type of storage to be used for undo history.
   * @param {string} type - The storage type (e.g. 'localStorage', 'sessionStorage')
   */
  setStorageType(type) {
    if (!type || typeof type !== 'string') {
      throw new Error('Invalid storage type');
    }
    if (type === 'localStorage') {
      this.storage = localStorage;
    } else if (type === 'sessionStorage') {
      this.storage = sessionStorage;
    } else {
      throw new Error(`Unsupported storage type: ${type}`);
    }
    this.storageAvailable = this.storageAvailable(type);
  },
  /**
   * Check if the given storage type is available.
   * @param {string} type - The storage type to check (e.g. 'localStorage', 'sessionStorage')
   * @returns {boolean} Whether the storage type is available
   */
  storageAvailable(type) {
    try {
      const storage = window[type]; // Ensure that storage is defined, even in browsers without support for window[type]
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      console.error(`Error: Undo storage type ${type} is not available}`);
      return false;
    }
  },
  /** 
   * Remove oldest undo history items when the history array exceeds the 
   * maximum length. */
  manageLength() {
    if (!this.history || !this.maxLength) {
      console.error('Error: Undo history or maxLength is missing');
      return;
    }
    if (typeof this.maxLength !== 'number' || this.maxLength < 0) {
      console.error('Error: Undo maxLength must be a non-negative number');
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
  /** 
   * Clear the undo history array and storage. */
  clearHistory() {
    try {
      this.history = [];
      if (this.storageAvailable)
      this.storage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * Initialize undo storage and maximum length.
   * @param {number} maxLength - Sets the maximum length of undo history
   * @param {string} storageType - Sets the storage type to be used for undo 
   * history (e.g. 'localStorage', 'sessionStorage')
   */
  initialize(maxLength = this.maxLength, storageType = this.storageType) {
    if (maxLength) {this.maxLength = maxLength};
    if (this.storageAvailable(storageType)) {
      this.setStorageType(storageType);
      if (this.storage.getItem(this.storageKey) !== null) {
        console.log(`${this.storageKey} exists in ${storageType}`);
        this.history = JSON.parse(this.storage.getItem(this.storageKey));
      } else {
        console.log(`${this.storageKey} does not exist in ${storageType}`);
        this.history = [];
        this.storage.setItem(this.storageKey, JSON.stringify(this.history));
      }
    }
  },
  /**
   * Listen for ctrl + z keypress then run the restore function.
   * @param {function} restore - The restore function to be run on ctrl + z
   * @param {object} item - The object to be compared to undo history
   */
  keyEvents(restore, item) {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey) {
        if (e.key === 'z' || e.key === 'Z') {
          const length = this.history.length
          if (length <= 0 || item === this.history[length - 1]) {
            alert('Nothing to undo');
          } else {
            const lastItem = this.history.pop();
            // run restore function passed as parameter
            restore(lastItem);
            try {
              this.storage.setItem(this.storageKey, JSON.stringify(this.history));
            } catch (e) {
              console.error(e);
              console.log('Error writing undo history to storage');
            }
          }
        }
      }
    });
  }
}

export { Undo };
