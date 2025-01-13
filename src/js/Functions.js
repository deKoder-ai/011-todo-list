const F = {
  newElement(type, content, classes, _id) {
    const element = document.createElement(type);
    if (content) {element.innerHTML = content;}
    if (classes) {
      for (let _class of classes) {
        element.classList.add(_class);
      }
    };
    if (_id) {element.id = _id};
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
  // clear HTML
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
  reduceString(str, len) {
    if (str.length > len) {
      return `${str.slice(0, len)}...`
    } else {
      return str;
    }
    
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
  setMinDateToToday(inputId) {
    var today = new Date();
    var minDate = today.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    document.getElementById(inputId).setAttribute('min', minDate);
  },
  /**
   * Create a .txt file and open the download window.
   * @param {string} filename - Name of the created file (no extension)
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
    const mask = document.getElementById('bcg-mask');
    if (mask) { mask.remove(); };
  },
}

export { F };

