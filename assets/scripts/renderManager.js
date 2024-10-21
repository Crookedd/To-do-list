import { showShareModal } from '../scripts/shareManager.js';
import { createEditModal } from '../scripts/editManager.js';
import { showConfirmationModal } from '../scripts/deleteManager.js';
const taskSection = document.getElementById('taskSection'); 

export function renderTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.setAttribute('data-id', task.id); // Устанавливаем атрибут data-id
    
    const textContainer = document.createElement('div');
    textContainer.className = 'text-container';
    
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = task.title;
    
    const about = document.createElement('div');
    about.className = 'about';
    about.textContent = task.about;
    
    textContainer.appendChild(title);
    textContainer.appendChild(about);
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete_button';
    deleteButton.innerHTML = '&times;';
    deleteButton.onclick = () => showConfirmationModal(task.id, taskDiv);
    
    taskDiv.appendChild(textContainer);
    taskDiv.appendChild(deleteButton);
    taskSection.appendChild(taskDiv);

    const buttonContainer = createButtonContainer(task, taskDiv);
    taskSection.appendChild(buttonContainer);
}

export function createButtonContainer(task, taskDiv) {
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button_container hidden'; 

    const shareButton = document.createElement('button');
    shareButton.className = 'action_button';
    shareButton.innerHTML = '<img src = "../assets/images/share.svg" />'; 
    shareButton.onclick = () => showShareModal(task);

    const infoButton = document.createElement('button');
    infoButton.className = 'action_button';
    infoButton.innerHTML = 'ℹ️'; 

    const editButton = document.createElement('button');
    editButton.className = 'action_button';
    editButton.innerHTML = '<img src = "../assets/images/edit.svg" />'; 
    editButton.onclick = () => createEditModal(task, taskDiv);

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(shareButton);
    buttonContainer.appendChild(infoButton);
    let hideTimeout;

    // Обработчики наведения
    taskDiv.onmouseover = () => {
        clearTimeout(hideTimeout); // Остановить таймер скрытия
        buttonContainer.classList.remove('hidden');
        taskDiv.classList.add('expanded');
    };

    taskDiv.onmouseout = () => {
        hideTimeout = setTimeout(() => {
            buttonContainer.classList.add('hidden');
            taskDiv.classList.remove('expanded');
        }, 200); // Задержка перед скрытием
    };

    // Обработчики для кнопок
    buttonContainer.onmouseover = () => {
        clearTimeout(hideTimeout); // Остановить таймер скрытия
        buttonContainer.classList.remove('hidden');
        taskDiv.classList.add('expanded');
    };

    buttonContainer.onmouseout = () => {
        hideTimeout = setTimeout(() => {
            buttonContainer.classList.add('hidden');
            taskDiv.classList.remove('expanded');
        }, 200); // Задержка перед скрытием
    };
    return buttonContainer;
}