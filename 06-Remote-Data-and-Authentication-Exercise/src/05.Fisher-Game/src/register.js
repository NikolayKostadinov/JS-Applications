window.addEventListener('load', () => {
    toggleUserGuest();
    document.getElementById('register').addEventListener('submit', onRegister);
})

function toggleUserGuest() {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const greetingName = document.querySelector('p.email span');
    document.getElementById('registerBtn').style.display = 'none';
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

async function onRegister(ev) {
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

        if (password !== rePass) {
            throw new Error('Passwords must be equal!');
        }

        const response = await fetch('http://localhost:3030/users/register',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
    } catch (err) {
        alert(err.message);
    }

}
