import { newElement } from "./functions";

const todo = {
  item(task, due, priority, notes) {
    console.log('item');
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
    console.log('addtoDOM');
    const todoList = newElement('div', '', ['todo-list']);
    const mainContent = document.getElementById('main-content');
    for (const item of todoItem) {
      const x = newElement('p', item);
      todoList.appendChild(x);
    }
    mainContent.appendChild(todoList);
  }

}




export { todo };