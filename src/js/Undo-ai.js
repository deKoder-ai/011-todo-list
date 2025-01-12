'use-strict'
class Undo {
  constructor(maxLength = 20, storageType = 'localStorage') {
    this.maxLength = maxLength;
    this.storageType = storageType;
    this.storage = new Storage(storageType);
    this.history = [];
    this.ctrlPressed = false;
    this.storageAvailable = this.storage.isAvailable();
    this.storageKey = 'undoHistory';
    this.initialize();
  }

  initialize() {
    if (this.storageAvailable) {
      this.setStorageType();
      const storedHistory = this.storage.getItem(this.storageKey);
      if (storedHistory !== null) {
        this.history = JSON.parse(storedHistory);
      } else {
        this.history = [];
      }
    }
  }

  setStorageType() {
    if (this.storageType === 'localStorage') {
      this.storage = new Storage('localStorage');
    } else if (this.storageType === 'sessionStorage') {
      this.storage = new Storage('sessionStorage');
    } else {
      throw new Error(`Unsupported storage type: ${this.storageType}`);
    }
  }

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
  }

  write(item) {
    if (!item) {
      console.log('Nothing to write to undo history');
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
  }

  clearHistory() {
    try {
      this.history = [];
      this.storage.setItem(this.storageKey, JSON.stringify(this.history));
    } catch (e) {
      console.error(e);
    }
  }

  keyEvents(restore, item) {
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
        const length = this.history.length;
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
    });
  }
}

export { Undo };