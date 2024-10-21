export function showShareModal(task) {
    const shareModal = document.getElementById('shareModal');
    shareModal.classList.remove('hidden');

    // Обработчики для кнопок 
    document.getElementById('copyToClipboard').onclick = () => copyTaskToClipboard(task);
    document.getElementById('shareTelegram').onclick = () => shareOnTelegram(task);
    document.getElementById('shareWhatsApp').onclick = () => shareOnWhatsApp(task);
    document.getElementById('shareVK').onclick = () => shareOnVK(task);

    shareModal.onclick = (event) => {
        if (event.target === shareModal) {
            shareModal.classList.add('hidden');
        }
    };
}

export function copyTaskToClipboard(task) {
    const taskText = `Задача: ${task.title}\nОписание: ${task.about}`;
    
    navigator.clipboard.writeText(taskText).then(() => {
        alert("Задача скопирована в буфер обмена!");
    }).catch(err => {
        console.error("Ошибка при копировании: ", err);
    });
}

export function shareOnTelegram(task) {
    const url = encodeURIComponent(`Задача: ${task.title}\nОписание: ${task.about}`);
    window.open(`https://t.me/share/url?url=${url}`, '_blank');
}

export function shareOnWhatsApp(task) {
    const url = encodeURIComponent(`Задача: ${task.title}\nОписание: ${task.about}`);
    window.open(`https://wa.me/?text=${url}`, '_blank');
}

export function shareOnVK(task) {
    const url = encodeURIComponent(`Задача: ${task.title}\nОписание: ${task.about}`);
    window.open(`https://vk.com/share.php?url=${url}`, '_blank');
}