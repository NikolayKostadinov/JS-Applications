const notificationElement = document.querySelector('.notification');
const messageElement = document.getElementById('message');
export function showNotification(message) {
    messageElement.textContent = message;
    notificationElement.style.display='block';
}

export function hideNotification() {
    notificationElement.style.display='';
}
