import { getDate, newElement } from "./functions";

const Projects = {
  today: {
    name: 'Today',
    dueDate: getDate(),
    todoList: []
  },
  daily: {
    name: 'Daily',
    dueDate: getDate(),
    todoList: []
  },
  list: [

  ],
  toggleNewProjectForm: false,
  newForm() {
    const maskPage = document.getElementById('mask-page');
    maskPage.style.display = 'block';
    const npForm = document.getElementById('np-form');
    npForm.style.display = 'block';
    document.getElementById('new-project-name').focus();
    this.toggleNewProjectForm = true;
  },
  closeNewForm() {
    document.getElementById('new-project-form').reset();
    const maskPage = document.getElementById('mask-page');
    maskPage.style.display = 'none';
    const npForm = document.getElementById('np-form');
    npForm.style.display = 'none'
    this.toggleNewProjectForm = false;
  },
  new() {
    const name = document.getElementById('new-project-name').value;
    const dueDate = document.getElementById('new-project-due-date').value;
    if (name && dueDate) {
      const newProject = {
        name: name,
        dueDate: dueDate,
        todoList: []
      }
      this.list.push(newProject);
      // console.log(this.list);
      this.createNewProjectBtn();
    }
  },
  formatDate(date) {
    const split = date.split('-');
    return `${split[2]}/${split[1]}/${split[0].slice(-2)}`;
  },
  createNewProjectBtn() {
    const newItem = this.list[this.list.length - 1];
    if (newItem.name && newItem.dueDate) {
      const id = this.list.length - 1;
      const date = this.formatDate(newItem.dueDate);
      const btnDiv = newElement('div', '', ['project-btn'], `project-btn-div-${id}`);
      const nameP = newElement('p', `- ${newItem.name}`);
      const dateP = newElement('p', `${date}`);
        dateP.style.fontSize = '1.2rem';
        dateP.style.paddingTop = '2px';
      const newItemBtn = newElement('button', '', '', `project-btn-${id}`);
        newItemBtn.style.position = 'absolute';
        newItemBtn.style.top = '0';
        newItemBtn.style.left = '1px';
        newItemBtn.style.width = '100%';
        newItemBtn.style.height = '100%';
        newItemBtn.addEventListener('mouseenter', function() {
          btnDiv.style.backgroundColor = "var(--red)";
          nameP.style.color = '#ffffff';
          nameP.style.fontWeight = '600';
          dateP.style.color = '#ffffff';
          dateP.style.fontWeight = '600';
        });
        newItemBtn.addEventListener('mouseleave', function() {
          btnDiv.style.backgroundColor = "initial"; // or any other default color
          nameP.style.color = 'initial';
          nameP.style.fontWeight = 'initial';
          dateP.style.color = 'initial';
          dateP.style.fontWeight = 'initial';
        });
      btnDiv.appendChild(nameP);
      btnDiv.appendChild(dateP);
      btnDiv.appendChild(newItemBtn);
      // console.log(btnDiv);
      const projectsList = document.getElementById('left-sidebar-projects');
      projectsList.appendChild(btnDiv);  
    } else {
      alert('Please fill in all fields');
    }
  },

}

export { Projects }
