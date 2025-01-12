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
  getLocalStorageKeys() {
    const keys = Object.keys(localStorage);
    if (keys) {
      for (let key of keys) {
        console.log(`LS Key: ${key}`);
      }
    } else {
      console.log('Local storage is empty');
    }
    console.log(`Storage length: ${localStorage.length}`);
  },
}


export { F };