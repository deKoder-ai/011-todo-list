import { Projects } from "./Projects";
import { F } from "./Functions";
import noteEditHtml from '../html/notesEdit.html';

const todoEdits = {
  editing: false,
  projId: undefined,
  currentProj: undefined,
  taskId: undefined,
  taskItemKey: undefined,
  tdiInfo: undefined,
  tdiEdit: undefined,
  mask: undefined,
  idSplit: undefined,
  addMaskToDOM() {
    const content = document.getElementById('content');
    console.log(content);
    this.mask = F.newElement('div', '', ['mask-bcg'], 'mask-bcg');
    // this.mask.addEventListener('click', function(e) {
    //   if (e.target.id === 'mask-bcg') {
    //     todoEdits.closeNewForm();
    //   }
    // });
    content.appendChild(this.mask);
  },
  removeMask() {
    this.mask.remove();
    this.mask = undefined;
  },
  setEditProjInfo() {
    this.projId = Number(this.idSplit[2]);
    this.currentProj = Projects.list[this.projId];
    this.taskId = Number(this.idSplit[4]);
    this.taskItemKey = this.idSplit[5];
    console.log(`Project: ${this.currentProj.name} | Task ID: ${this.taskId} | Data: ${this.taskItemKey}`);
  },
  getEditElements(id) {
    this.tdiInfo = document.getElementById(id);
    this.tdiEdit = document.getElementById(id + '-edit');
  },
  // clickCount: 0,
  // abc() {
  //   // console.log(this.idSplit[6]);
  //   // if (this.clickCount == 1 && this.editing && this.idSplit[6] !== 'edit') {
  //   //   console.log('clickety click');
  //   //   this.tdiEdit.value = this.tdiInfo.innerHTML;
  //   //   this.tdiInfo.style.display = 'block';
  //   //   this.tdiEdit.style.display = 'none';
  //   //   this.editing = false;
  //   //   this.showInstructions(false);
  //   //   this.clickCount = 0;
  //   //   // if (!this.editing) {
  //   //   //   this.clickCount = 0;
  //   //   // }
  //   // }
  //   // console.log(this.clickCount);
  // },
  events() {
    const todoListDiv = document.getElementById('todo-list')

    // document.body.addEventListener('click', function(e) {
    //   const target = e.target;
    //   // console.log('Click me baby one more time');
    //   todoEdits.abc();
    // });

    todoListDiv.addEventListener('click', function(e) {
      const id = e.target.id;
      todoEdits.idSplit = id.split('-');
      // check if not currently editing and target is todo list item
      if (!todoEdits.editing && todoEdits.idSplit[0] === 'tdi') {
        todoEdits.setEditProjInfo();
        
        switch(todoEdits.taskItemKey) {
          case 'task':
            // todoEdits.addMaskToDOM();
            todoEdits.showInstructions(true);
            todoEdits.getEditElements(id);
            todoEdits.switchToEditDisplay();
            todoEdits.tdiEdit.addEventListener('keydown', function(e) {
              todoEdits.handleKeyPress(e);
            });
            todoEdits.clickCount = 1;
            break;
          case 'dueDate':
            todoEdits.showInstructions(true);
            todoEdits.getEditElements(id);
            todoEdits.switchToEditDisplay();
            todoEdits.tdiEdit.showPicker();
            todoEdits.tdiEdit.addEventListener('keydown', function(e) {
              todoEdits.handleKeyPress(e);
            });
            break;
          case 'priority':
            todoEdits.showInstructions(true);
            todoEdits.getEditElements(id);
            todoEdits.switchToEditDisplay();
            todoEdits.tdiEdit.addEventListener('keydown', function(e) {
              todoEdits.handleKeyPress(e);
            });
            break;
          case 'notes':
            // todoEdits.mask.style.display = 'block';
            // console.log(todoEdits.mask);
            todoEdits.addMaskToDOM();
            todoEdits.tdiInfo = document.getElementById(id);
            // todoEdits.switchToEditDisplay();
            // todoEdits.tdiEdit.style.display = 'block';
            todoEdits.editing = true;
            const todoHeadDiv = document.getElementById('todo-head');
            const editNoteDiv = F.newElement('div', '', '', 'edit-note');
            editNoteDiv.innerHTML = noteEditHtml;

            // todoHeadDiv.appendChild(editNoteDiv);
            todoEdits.mask.appendChild(editNoteDiv);

            const closeNoteEditBtn = document.getElementById('close-notes-edit');
            const notesTaskSpan = document.getElementById('edit-note-task-span');
            const notesDateSpan = document.getElementById('edit-note-date-span');
            const notesPrioritySpan = document.getElementById('edit-note-priority-span');
            const notesTextarea = document.getElementById('edit-note-textarea');
            notesTextarea.focus();
            // fill note edit window spans
            const task = todoEdits.currentProj.todoList[todoEdits.taskId].task;
            notesTaskSpan.innerText = task;
            const dueDate = todoEdits.currentProj.todoList[todoEdits.taskId].dueDate;
            notesDateSpan.innerText = dueDate;
            const priority = todoEdits.currentProj.todoList[todoEdits.taskId].priority;
            notesPrioritySpan.innerText = priority;
            const notes = todoEdits.currentProj.todoList[todoEdits.taskId].notes;
            notesTextarea.defaultValue = notes;
            // handle events
            closeNoteEditBtn.addEventListener('click', function(e) {
              editNoteDiv.remove();
              todoEdits.removeMask();
              todoEdits.editing = false;
            });
            editNoteDiv.addEventListener('keydown', function(e) {
              if (e.key === 'Escape') {
                editNoteDiv.remove();
                todoEdits.removeMask();
                todoEdits.editing = false;
              } 
            });
            todoEdits.mask.addEventListener('click', function(e) {
              if (e.target.id === 'mask-bcg') {
                editNoteDiv.remove();
                todoEdits.removeMask();
                todoEdits.editing = false;
              }
            });
            const editBtn = document.getElementById('notes-edit-submit');
            editBtn.addEventListener('click', function(e) {
              let newValue = notesTextarea.value;
              todoEdits.updateTodoListData(newValue);
              todoEdits.tdiInfo.innerHTML = F.reduceString(newValue, 20);
              todoEdits.editing = false;
              editNoteDiv.remove();
              todoEdits.removeMask();
              F.writeToLocalStorage('projectsList', Projects.list);
            })
            break;
          case 'done':
            todoEdits.updateDone(id);
            F.writeToLocalStorage('projectsList', Projects.list);
            break;
          default:
            break;
        }
      }
    });
  },
  switchToEditDisplay() {
    this.tdiInfo.style.display = 'none';
    this.tdiEdit.style.display = 'block';
    this.tdiEdit.focus();
    this.editing = true;
  },
  handleKeyPress(e) {
    if (e.key === 'Escape') {
      this.tdiEdit.value = this.tdiInfo.innerHTML;
      this.tdiInfo.style.display = 'block';
      this.tdiEdit.style.display = 'none';
      this.editing = false;
      this.showInstructions(false);
    } else if (e.key === 'Enter') {
      let newValue = this.tdiEdit.value;
      if (this.taskItemKey === 'dueDate') {newValue = F.dateToUKStr(newValue)};
      this.updateTodoListData(newValue);
      this.tdiInfo.innerHTML = newValue;
      this.tdiInfo.style.display = 'block';
      this.tdiEdit.style.display = 'none';
      this.editing = false;
      this.showInstructions(false);
      F.writeToLocalStorage('projectsList', Projects.list);
    }
    this.tdiEdit.removeEventListener('keydown', function(e) {
      todoEdits.handleKeyPress(e);
    });
  },
  updateTodoListData(newValue) {
    const key = this.taskItemKey;
    const todoItem = this.currentProj.todoList[this.taskId];
    todoItem[key] = newValue;
    console.log(`Edited Project: ${this.currentProj.name}\nTask ID: ${this.taskId}\n${key}: ${todoItem[key]}`);
    console.log(this.currentProj);
  },
  updateDone(id) {
    const checkbox = document.getElementById(id);
    const key = this.taskItemKey;
    const todoItem = this.currentProj.todoList[this.taskId];
    todoItem[key] = checkbox.checked;
    console.log(`Edited Project: ${this.currentProj.name}\nTask ID: ${this.taskId}\n${key}: ${todoItem[key]}`);
    console.log(this.currentProj);
  },
  showInstructions(show) {
    const instructions = document.getElementById('edit-instructions');
    if (show) {
      instructions.style.display = 'block'
    } else {
      instructions.style.display = 'none'
    };
  },
}

export { todoEdits };