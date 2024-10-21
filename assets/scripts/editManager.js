export function createEditModal(task, taskDiv) {
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

export function updateTaskDisplay(task, taskDiv) {
    const titleElement = taskDiv.querySelector('.title');
    const aboutElement = taskDiv.querySelector('.about');
    titleElement.textContent = task.title;
    aboutElement.textContent = task.about;
}

export function saveTasksToLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
}