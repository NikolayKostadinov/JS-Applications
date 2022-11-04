import {showHome} from "./home.js";
import {checkUserNav} from "./utils.js";

const section = document.getElementById('login-view');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
section.remove();

export async function showLogin() {
    document.querySelector('main').replaceChildren(section);
}

async function onLogin(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const {email, password} = Object.fromEntries(formData)
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
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim()
                })
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
        checkUserNav();
        await showHome();
    } catch (err) {
        alert(err.message);
    }
}
