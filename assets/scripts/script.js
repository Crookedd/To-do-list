document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add_button');
    const taskSection = document.getElementById('taskSection'); 
    const titleInput = document.querySelector('.input.title');
    const aboutInput = document.querySelector('.input.about');
    const noTasksMessage = document.getElementById('noTasksMessage');

    loadTasks();

    addButton.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const about = aboutInput.value.trim();

        if (title && about) {
            const task = { title, about };
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
    
    function renderTask(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        
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
        deleteButton.onclick = () => showConfirmationModal(task, taskDiv);
        
        taskDiv.appendChild(textContainer);
        taskDiv.appendChild(deleteButton);
        taskSection.appendChild(taskDiv);
    
        const buttonContainer = createButtonContainer(task, taskDiv);
        taskSection.appendChild(buttonContainer);
    }

    function showConfirmationModal(task, taskDiv) {
        const modal = document.getElementById('confirmationModal');
        modal.classList.remove('hidden');
    
        document.getElementById('confirmDelete').onclick = () => {
            taskSection.removeChild(taskDiv);
            deleteTask(task);
            updateNoTasksMessage();
            modal.classList.add('hidden');
        };
    
        document.getElementById('cancelDelete').onclick = () => {
            modal.classList.add('hidden');
        };
    }

    function createButtonContainer(task, taskDiv) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button_container hidden'; 
    
        const shareButton = document.createElement('button');
        shareButton.className = 'action_button';
        shareButton.innerHTML = '<img src = "../assets/images/share.svg" />'; 
    
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

    function createEditModal(task, taskDiv) {
        const editModal = document.getElementById('editModal');
        editModal.classList.remove('hidden');
        const miniInput = editModal.querySelector('.mini_input');
        const maxInput = editModal.querySelector('.max_input');
        const saveButton = editModal.querySelector('.save_button');
        const cancelButton = editModal.querySelector('.cancel_button');
        
        miniInput.value = task.title;
        maxInput.value = task.about;

        saveButton.onclick = () => {
            task.title = miniInput.value;
            task.about = maxInput.value;
            updateTaskDisplay(task, taskDiv);
            editModal.classList.add('hidden');
            saveTasksToLocalStorage();
        };

        cancelButton.onclick = () => {
            editModal.classList.add('hidden');
        };
    }

    function updateTaskDisplay(task, taskDiv) {
        const titleElement = taskDiv.querySelector('.title');
        const aboutElement = taskDiv.querySelector('.about');
        titleElement.textContent = task.title;
        aboutElement.textContent = task.about;
    }

    function saveTasksToLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(taskToDelete) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.title !== taskToDelete.title || task.about !== taskToDelete.about);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function updateNoTasksMessage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const topLine = document.querySelector('.top_line'); 
        const bottomLine = document.querySelector('.top_line:last-of-type'); 
    
        if (tasks.length === 0) {
            noTasksMessage.style.display = 'block'; 
            topLine.style.display = 'block'; 
            bottomLine.style.display = 'block';
        } else {
            noTasksMessage.style.display = 'none';
            topLine.style.display = 'none'; 
            bottomLine.style.display = 'none'; 
        }
    }
});
