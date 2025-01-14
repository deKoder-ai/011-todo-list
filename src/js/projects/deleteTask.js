'use-strict'

import { F } from "../Functions";
import { Projects } from "../Projects";
import { Undo } from "../Undo";
import { Todo } from "../Todo";

function deleteTask(clickId) {
  Undo.write(Projects.list);
  const splitString = clickId.split('-');
  const projId = Number(splitString[2]);
  const taskId = Number(splitString[4]);
  const project = Projects.list[projId];
  const task = project.todoList[taskId];
  (() => {
    try {
      Projects.list[projId].todoList.splice(taskId, 1);
      F.log(`Project: ${project.name} - Removed Task: ${task.task}`);
    } catch (e) {
      F.log(`Error deleting ${task.task}`);
    }
  })();
  
  F.writeToLocalStorage('projectsList', Projects.list);
  // Projects.currentProjId = projId;
  // Projects.displayProjectContent(projId);
  // temp using refresh as the two lines above break undo
  // window.location.reload(true);
  const todoListHtml = document.getElementById('todo-list');
  todoListHtml.innerHTML = '';
  const todoList = Projects.list[Projects.currentProjId].todoList;
  for (let i = 0; i < todoList.length; i++) {
    Todo.appendTaskToDOM(todoList[i], i);
  }
}

export { deleteTask };