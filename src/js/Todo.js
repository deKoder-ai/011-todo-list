import { F } from './Functions';
import { Projects } from './Projects';
import newTaskForm from '../html/newTaskForm.html';
import todoItemHtml from '../html/todoItem.html';

class itemHtml {
  constructor(html, task) {
    this.html = new String(html);
    this.div = F.newElement('div', ``, ['todo-item']);
    this.task = task;
  }
}

const Todo = {
  toggleNewForm: false,
  newForm() {
    const mask = document.getElementById('mask-page');
    mask.style.display = 'block';
    const mainContent = document.getElementById('main-content');
    const container = F.newElement('div', newTaskForm, '', 'temp');
    mainContent.appendChild(container);
    document.getElementById('new-task-name').focus();
    this.toggleNewForm = true;
  },
  closeNewForm() {
    document.getElementById('new-task-form').reset();
    document.getElementById('temp').remove();
    const maskPage = document.getElementById('mask-page');
    maskPage.style.display = 'none';
    this.toggleNewForm = false;
  },
  new() {
    const nameErrorMsg = document.getElementById('name-error');
    const dateErrorMsg = document.getElementById('date-error');
    const nameInput = document.getElementById('new-task-name')
    const dateInput = document.getElementById('new-task-due-date');
    const task = nameInput.value;
    const dueDate = F.dateToUKStr(dateInput.value);
    const priority = document.getElementById('new-task-priority').value;
    const notes = document.getElementById('new-task-notes').value;
    // add task to project if form complete
    if (task !== '' && dueDate) {
      const newTask = {
        task,
        dueDate,
        priority,
        notes,
        done: false
      }
      const id = Projects.current;
      Projects.list[id].todoList.push(newTask);

      this.itemHtml(newTask);
      this.closeNewForm();
      return true;
    } else { // else handle input errors
      if (!task && !dueDate) {
        nameInput.style.outline = '3px solid var(--red)';
        dateInput.style.outline = '3px solid var(--red)';
        nameErrorMsg.style.display = 'block';
        dateErrorMsg.style.display = 'block';
      } else if (task !== '' && !dueDate) {
        nameInput.style.outline = '1px solid black';
        dateInput.style.outline = '3px solid var(--red)';
        nameErrorMsg.style.display = 'none';
        dateErrorMsg.style.display = 'block';
      } else if (task === '' && dueDate) {
        nameInput.style.outline = '3px solid var(--red)';
        dateInput.style.outline = '1px solid black';
        nameErrorMsg.style.display = 'block';
        dateErrorMsg.style.display = 'none';
      }
    }
    nameInput.addEventListener('input', function(e) {
      if (nameInput.value !== '') {
        nameInput.style.outline = '1px solid black';
      }
    });
    dateInput.addEventListener('input', function(e) {
      if (dateInput.value !== '') {
        dateInput.style.outline = '1px solid black';
      }
    });
  },
  itemHtml(task) {
    const html = new itemHtml(todoItemHtml, task);
    const projId = Projects.current;
    // will need to remove the - 1 below if save html instead of raw data
    const todoId = Projects.list[projId].todoList.length - 1;

    html.div.innerHTML = html.html;

    // fill content
    const divChildren = html.div.children;

    divChildren[0].children[0].innerHTML = task.task;
    divChildren[0].children[0].id = `tdi-proj-${projId}-todo-${todoId}-task`;
    divChildren[0].children[1].value = task.task;
    divChildren[0].children[1].id = `tdi-proj-${projId}-todo-${todoId}-task-edit`;

    divChildren[1].children[0].innerHTML = task.dueDate;
    divChildren[1].children[0].id = `tdi-proj-${projId}-todo-${todoId}-dueDate`;
    divChildren[1].children[1].value = new Date().toISOString().split('T')[0];
    divChildren[1].children[1].id = `tdi-proj-${projId}-todo-${todoId}-dueDate-edit`;

    divChildren[2].children[0].innerHTML = task.priority;
    divChildren[2].children[0].id = `tdi-proj-${projId}-todo-${todoId}-priority`;
    divChildren[2].children[1].selected = task.priority;
    divChildren[2].children[1].id = `tdi-proj-${projId}-todo-${todoId}-priority-edit`;

    divChildren[3].children[0].innerHTML = F.reduceString(task.notes, 20);
    divChildren[3].children[0].id = `tdi-proj-${projId}-todo-${todoId}-notes`;

    divChildren[4].children[0].id = `tdi-proj-${projId}-todo-${todoId}-done`;

    const todoListDiv = document.getElementById('todo-list');
    todoListDiv.appendChild(html.div);
  },



  
  appendItemToDOM(task) {
    const todoListDiv = document.getElementById('todo-list');
    todoListDiv.appendChild(task);
  },

  item(task, due, priority, notes) {
    const todoItem = [
      task,
      due,
      priority,
      notes,
      false
    ]
    return todoItem;
  },
  addToDOM(todoItem) {
    const todoList = F.newElement('div', '', ['todo-list']);
    const mainContent = document.getElementById('main-content');
    for (const item of todoItem) {
      const x = F.newElement('p', item);
      todoList.appendChild(x);
    }
    mainContent.appendChild(todoList);
  }

}




export { Todo };