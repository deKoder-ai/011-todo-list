// create new html element
function newElement(type, content, classes, _id) {
    const element = document.createElement(type);
    if (content) {element.innerHTML = content;}
    if (classes) {
        for (let _class of classes) {
            element.classList.add(_class);
        }
    };
    if (_id) {element.id = _id};
    return element;
}

// create table (no header)
function createTable(content, tableId) {
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
}

// clear HTML
function clearHTML(element) {
    element.innerHTML = '';
}

// get today's date
function getDate() {
    const today = new Date();
    let day = today.getDate();
    day = day.toString().padStart(2, '0');
    let month = today.getMonth() + 1; // Months are 0-indexed, so add 1
    month = month.toString().padStart(2, '0')
    let year = today.getFullYear();
    year = year.toString().slice(-2);
    
    const dateStr = `${day}/${month}/${year}`;
    return dateStr;
}


export { newElement, createTable, clearHTML, getDate };