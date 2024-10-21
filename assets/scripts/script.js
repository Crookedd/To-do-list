import {updateNoTasksMessage } from '../scripts/deleteManager.js';
import { renderTask } from '../scripts/renderManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add_button'); 
    const titleInput = document.querySelector('.input.title');
    const aboutInput = document.querySelector('.input.about');

    loadTasks();

    addButton.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const about = aboutInput.value.trim();

        if (title && about) {
            const task = { id: Date.now(), title, about };
            saveTask(task);
            renderTask(task);
            titleInput.value = '';
            aboutInput.value = '';
        } else {
            alert("Пожалуйста, заполните оба поля!");
        }
    });

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateNoTasksMessage();
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => renderTask(task));
        updateNoTasksMessage();
    }
});
