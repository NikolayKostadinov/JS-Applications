window.addEventListener('load', () => {
    toggleUserGuest();
    document.getElementById('logout').addEventListener('click', onLogout);
})

function toggleUserGuest() {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const greetingName = document.querySelector('p.email span');
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
        greetingName.textContent = userData.email;
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
        greetingName.textContent = 'guest';
    }
}

async function onLogout() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    try {
        const response = await fetch('http://localhost:3030/users/logout',
            {
                method:"GET",
                headers: {'X-Authorization': userData.accessToken}});

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }

        sessionStorage.removeItem('userData');
        window.location = 'index.html';
    } catch (err) {
        alert(err.message);
    }
}
