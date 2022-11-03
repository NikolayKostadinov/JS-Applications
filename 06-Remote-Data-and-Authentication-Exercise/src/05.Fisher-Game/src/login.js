window.addEventListener('load', () => {
    toggleUserGuest();
    document.getElementById('login').addEventListener('submit', onLogin);
})

function toggleUserGuest() {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const greetingName = document.querySelector('p.email span');
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    document.getElementById('loginBtn').style.display = 'none';

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

async function onLogin(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const {email, password, rePass} = Object.fromEntries(formData)
    try {
        if (email === '') {
            throw new Error('Email is required!');
        }

        if (password === '') {
            throw new Error('Password is required!');
        }

        const response = await fetch('http://localhost:3030/users/login',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        sessionStorage.setItem('userData',
            JSON.stringify({
                id: data._id,
                email: data.email,
                accessToken: data.accessToken
            }));

        window.location = 'index.html';

    } catch (err) {
        alert(err.message);
    }
}
