'use strict'
import { F } from '../Functions';
import { Projects } from '../Projects';
import { LeftSidebar } from './LeftSidebar';
import { Undo } from '../Undo';
import restoreForm from '../../html/restoreForm.html'

const RestoreProjects = {
  toggleFileUploadForm: false,

  openFileUploadForm() {
    this.toggleFileUploadForm = true;
    F.addBackgroundMask(3000, '#000000', 0.4, true);
    const mainContent = document.getElementById('main-content');
    const formContainer = F.htmlElement('div', restoreForm, '', 'temp');
    formContainer.style.marginTop = '-200px';
    mainContent.appendChild(formContainer);
    const fileInput = document.getElementById('file-input');
    const restoreBtn = document.getElementById('file-submit-btn');
    const errorMsg = F.htmlElement('p', 'Please select a file to restore projects from', ['form-error']);
    fileInput.focus();
    this.handleNoFileError(fileInput, restoreBtn, errorMsg);
    this.handleFileUpload(fileInput, restoreBtn, errorMsg);
  },
  closeFileUploadForm() { // formerly closeNewForm
    if (this.toggleFileUploadForm) {
      document.getElementById('restore-form').reset();
      document.getElementById('temp').remove();
      F.removeBackgroundMask();
      this.toggleFileUploadForm = false;
    }
  },
  handleFileUpload(fileInput, restoreBtn, errorMsg) {
    function readFileAsText(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsText(file);
      });
    }
    fileInput.addEventListener('change', async (e) => {
        errorMsg.style.display = 'none';
        fileInput.style.outline = '1px solid black';
        const file = e.target.files[0];
        Undo.write(Projects.list);
        if (file) {
          try {
            const fileContents = await readFileAsText(file);
            // Now you can use fileContents
            restoreBtn.addEventListener('click', (e) => {
              try {
                const projectsList = JSON.parse(fileContents);
                const test = projectsList[0].name === 'Today';
                if (test) {
                  Projects.list = projectsList;
                  F.writeToLocalStorage('projectsList', Projects.list);
                  LeftSidebar.populateProjectsListDiv();
                  LeftSidebar.updateCount();
                  this.closeFileUploadForm();
                } else {
                  alert('Error getting data: File does not contain valid restore data');
                }
              } catch (e) {
                alert('Error getting data: File does not contain valid restore data')
              }
            });
          } catch (error) {
              console.error('Error reading file:', error);
          }
        }
    });
  },
  handleNoFileError(fileInput, restoreBtn, errorMsg) {
    const container = document.getElementById('file-input-container');
    restoreBtn.addEventListener('click', (e) => {
      console.log(errorMsg);
      if (!fileInput.value) {
        container.appendChild(errorMsg);
        errorMsg.style.display = 'block';
        fileInput.style.outline = '2px solid var(--red)'
      }
    });
  },
}

export { RestoreProjects };



