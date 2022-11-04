import {checkUserNav} from "./utils.js";
import {showHome} from "./home.js";

const section = document.getElementById('register-view');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

export async function showRegister() {
    document.querySelector('main').replaceChildren(section);
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const {email, password, rePass} = Object.fromEntries(formData);
    try {
        if (email === '' || password === '') {
            throw new Error('Email and Password are required!');
        }

        if (password !== rePass) {
            throw new Error('Passwords must be equal!');
        }

        const response = await fetch('http://localhost:3030/users/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        const user = {id: data._id, email: data.email, accessToken: data.accessToken};
        sessionStorage.setItem('userData', JSON.stringify(user));
        checkUserNav();
        showHome();
    } catch (err) {
        alert(err.message);
    }
}
