export function showConfirmationModal(taskId, taskDiv) {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('hidden');

    document.getElementById('confirmDelete').onclick = () => {
        deleteTask(taskId);
        taskSection.removeChild(taskDiv);
        updateNoTasksMessage();
        modal.classList.add('hidden'); // Закрываем модальное окно
    };

    document.getElementById('cancelDelete').onclick = () => {
        modal.classList.add('hidden');
    };
}

export function deleteTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskId); // Удаляем по ID
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

export function updateNoTasksMessage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const topLine = document.querySelector('.top_line'); 
    const bottomLine = document.querySelector('.top_line:last-of-type'); 
    const noTasksMessage = document.getElementById('noTasksMessage');

    if (tasks.length === 0) {
        noTasksMessage.classList.remove('hidden'); 
        topLine.classList.remove('hidden'); 
        bottomLine.classList.remove('hidden');
    } else {
        noTasksMessage.classList.add('hidden');
        topLine.classList.add('hidden'); 
        bottomLine.classList.add('hidden'); 
    }
}