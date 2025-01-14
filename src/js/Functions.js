'use strict'

const F = {
  /**
   * Create a new HTML element.
   * 
   * See here for a comprehensive list of HTML tags: https://developer.mozilla.org/en-US/docs/Web/HTML/Element
   * @param {string} tag - Name of the created file (no extension)
   * @param {any} content - The text or HTML content of the new element
   * @param {string|Array} classes - The class or classes to be applied to the new element. This can be a string for a single class or an array for multiple classes (eg. ['a', 'b', 'c'])
   * @param {string} id - The ID for the new element
   * @returns {Object} The generated HTML element
   */
  htmlElement(tag = 'div', content, classes, id) {
    const element = document.createElement(tag);
    if (content) { element.innerHTML = content; }
    if (classes) {
      if (typeof classes === 'string') 
        { 
          element.classList.add(classes); 
        } else if (typeof classes === 'object') {
        for (let item of classes) {
          element.classList.add(item);
        }
      };
    }
    if (id) { element.id = id };
    return element;
  },
  // create table (no header)
  createTable(content, tableId) {
    const table = document.createElement('table');
    table.id = tableId;
    for (const item of content) {
      const keys = Object.keys(item);
      const row = document.createElement('tr');
      for (let i = 0; i < keys.length; i ++) {
        const td = document.createElement('td');
        td.classList.add(`td-${i}`);
        td.innerHTML = item[keys[i]];
        row.appendChild(td);
      }
      table.appendChild(row);
    }
    return table;
  },
  /**
   * Clears the content of an HTML element.
   * @param {Object} element - The HTML element to clear
   */
  clearHTML(element) {
    element.innerHTML = '';
  },
  // get today's date
  getDate() {
    const today = new Date();
    let day = today.getDate();
    day = day.toString().padStart(2, '0');
    let month = today.getMonth() + 1; // Months are 0-indexed, so add 1
    month = month.toString().padStart(2, '0')
    let year = today.getFullYear();
    year = year.toString().slice(-2);
    const dateStr = `${day}/${month}/${year}`;
    return dateStr;
  },
  dateToUKStr(date) {
    if (date) {
      const split = date.split('-');
      return `${split[2]}/${split[1]}/${split[0].slice(-2)}`;
    } else {
      console.log('F.dateToUKStr(date): No date provided');
      return undefined;
    }
  },
  /**
  * Truncate a supplied string to the given length and adds optional ellipsis.
  * @param {string} str - The string to be truncated
  * @param {number} length - Maximum length of the output string
  * @param {boolean} ellipsis - Adds an ellipsis (...) to the truncated string if true
  * @returns {string} The newly truncated string
  */
  truncateString(str, length, ellipsis = true) {
    if (str.length > length) { 
      str = str.slice(0, length);
      if (ellipsis) { str = `${str}...`}; 
    };
    return str;
  },
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
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  writeToLocalStorage(key, data) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(String(key), jsonData);
  },
  getLocalStorageItem(key) {
    const item = localStorage.getItem(String(key));
    if (item) {
      return JSON.parse(item);
    } else {
      console.log(`No data in key: ${key}`)
    }
  },
  getLocalStorageKeys(log) {
    const keys = Object.keys(localStorage);
    if (keys && log) {
      for (let key of keys) {
        console.log(`LS Key: ${key}`);
      }
    } else {
      console.log('Local storage is empty');
    }
    return keys;
  },
  /**
   * Clear local or session storage.
   * @param {string} type - 'local' clears localStorage. 'session' clears sessionStorage. If blank, do nothing
   */
  clearBrowserStorage(type) {
    if (type === 'local') { localStorage.clear(); }
    if (type === 'session') { sessionStorage.clear(); }
  },
  setMinDateToToday(inputId) {
    var today = new Date();
    var minDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    document.getElementById(inputId).setAttribute('min', minDate);
  },
  /**
   * Create a .txt file and open the download window.
   * @param {string} filename - Name of the created file (no extension needed)
   * @param {any} text - The text to be saved to the file
   * @param {boolean} json - If true then the text will be converted to JSON
   */
  downloadTxtFile(filename, text, json) {
    let content = text;
    if (json) { content = JSON.stringify(text)};
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${filename}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },
  /**
   * Create a mask to cover elements of the background. Element Id: 'bcg-mask'
   * @param {number} zIndex - Sets the z-index of the mask
   * @param {string} color - Sets the color of the mask
   * @param {number} opacity - Sets the opacity of the mask | 0 - invisible | 1 - solid
   * @param {boolean} remove - Adds an event listener to remove the mask if it is clicked
   */
  addBackgroundMask(zIndex, color, opacity, remove) {
    const mask = document.createElement('div');
    mask.id = 'bcg-mask';
    mask.style.display = 'block';
    mask.style.width = '200vw';
    mask.style.height = '200vh';
    mask.style.overflow = 'hidden';
    mask.style.backgroundColor = color;
    mask.style.opacity = opacity;
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.zIndex = zIndex;
    document.body.appendChild(mask);
    if (remove) {
      mask.addEventListener('click', (e) => {
        this.removeBackgroundMask();
      })
    }
  },
  /**
   * Remove the mask created by this.addBackgroundMask().
   */
  removeBackgroundMask() {
    let mask = document.getElementById('bcg-mask');
    if (mask) {
      mask = document.getElementById('bcg-mask');
      mask.remove();
      mask = document.getElementById('bcg-mask');
      if (mask) { 
        this.removeBackgroundMask();
      }
    }
  },
  /**
   * Add a CSS outline to the global selector (*) to help visualize HTML document layout.
   * @param {boolean} bool - True applies the outline to all elements
   * @param {number} width - Sets the width of the outline in pixels (default: 1)
   * @param {string} style - Sets the outline style. (eg. solid, dashed or dotted) (default: dashed)
   * @param {string} color - Sets the color of the outline  (default: blue)
   */
  addOutlineToAllElements(bool, width = 1, style = 'dashed', color = 'blue') {
    if (bool) {
      var styleElement = document.createElement('style');
      styleElement.innerHTML = `* {outline: ${width}px ${style} ${color}}`;
      document.head.appendChild(styleElement);
    }
  },
  /**
   * Trigger a function in response to a document event.
   * 
   * See: https://dbchung3.medium.com/add-event-listener-dom-event-types-6c10a844c9d8 for more information on event types.
   * See: https://developer.mozilla.org/en-US/docs/Web/API/Event for (e) methods and properties.
   * @param {function} eventHandler - The function to run in response to an event
   * @param {boolean} log - Log the event target to the console if true (default: false)
   * @param {string} type - The type of event to trigger the logic function (default: 'click')
   * @param {boolean} preventDefault - If true, prevents the default action of the event
   */
  EventHandler: function (processEvent, type = 'click', log = 'false', preventDefault = 'false') {
    this.processEvent = processEvent;
    this.type = type;
    this.log = log;
    this.preventDefault = preventDefault;

    document.addEventListener(type, (e) => {
      if (this.preventDefault === true || this.preventDefault === 1) { e.preventDefault(); }
      // logging
      if (this.log === true || this.log === 1) {
        if (this.type === 'click') { F.log(`Single click on:`); }
        if (this.type === 'dblclick') { console.log(`Double click on:`) };
        if (this.type === 'contextmenu') { console.log(`Right click on:`) };
        if (this.type === 'keydown') { console.log(`${e.key} key pressed`) };
        if (this.type === 'keyup') { console.log(`${e.key} key up`) };
        if (this.type !== 'keydown' && this.type !== 'keyup') { F.log(e.target); }
      }
      // run supplied function
      this.processEvent(e);
    });
  },
  /**
   * Shorthand for console.log().
   * @param {any} item - The item to log to the console.
   */
  log(item) {
    console.log(item);
  },
}

const Y = {
  sayHello() {
    this.cl('Hello')
  },
}

export { F };




