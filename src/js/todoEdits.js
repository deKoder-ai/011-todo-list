import { Projects } from "./Projects";
import { F } from "./Functions";


const todoEdits = {
  editing: false,
  projId: undefined,
  currentProj: undefined,
  taskId: undefined,
  taskItemKey: undefined,
  tdiInfo: undefined,
  tdiEdit: undefined,
  showInstructions(show) {
    const instructions = document.getElementById('edit-instructions');
    if (show) {
      instructions.style.display = 'block'
    } else {
      instructions.style.display = 'none'
    };
    console.log(`Instru ${show}`);
  },
  setEditProjInfo(idSplit) {
    this.projId = Number(idSplit[2]);
    this.currentProj = Projects.list[this.projId];
    this.taskId = Number(idSplit[4]);
    this.taskItemKey = idSplit[5];
    console.log(`Project: ${this.currentProj.name} | Task ID: ${this.taskId} | Data: ${this.taskItemKey}`);
  },
  getEditElements(id) {
    todoEdits.tdiInfo = document.getElementById(id);
    todoEdits.tdiEdit = document.getElementById(id + '-edit');
  },
  events() {
    const todoListDiv = document.getElementById('todo-list')
    todoListDiv.addEventListener('click', function(e) {
      const id = e.target.id;
      const idSplit = id.split('-');
      // check if not currently editing and target is todo list item
      if (!todoEdits.editing && idSplit[0] === 'tdi') {
        todoEdits.setEditProjInfo(idSplit);
        

        switch(todoEdits.taskItemKey) {
          case 'task':
            todoEdits.showInstructions(true);
            todoEdits.getEditElements(id);
            todoEdits.switchToEditDisplay();
            todoEdits.tdiEdit.addEventListener('keydown', function(e) {
              todoEdits.handleKeyPress(e);
            });
            break;
          case 'dueDate':
            todoEdits.showInstructions(true);
            todoEdits.getEditElements(id);
            todoEdits.switchToEditDisplay();
            todoEdits.tdiEdit.showPicker();
            todoEdits.tdiEdit.addEventListener('keydown', function(e) {
              todoEdits.handleKeyPress(e);
            });
          case 'priority':
            todoEdits.showInstructions(true);
            todoEdits.getEditElements(id);
            todoEdits.switchToEditDisplay();
            todoEdits.tdiEdit.addEventListener('keydown', function(e) {
              todoEdits.handleKeyPress(e);
            });
          case 'done':
            // todoEdits.showInstructions(false);
            todoEdits.updateDone(id);
            
            // console.log(checkbox.checked);
            // console.log('checkbox');


            break;
          default:

            break;
        }

      
      // switch(target.id) {
      //   case 'dropdown-item-1':
      //     console.log('Nav Link 1');
      //     break;
      // }
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
  }
}



export { todoEdits };