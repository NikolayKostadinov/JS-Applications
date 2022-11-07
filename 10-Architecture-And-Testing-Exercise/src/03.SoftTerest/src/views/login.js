import {login} from "../api/users.js";

const section = document.getElementById('loginPage');

const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let context = null;

export function showLogin(inContext) {
    context = inContext
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const {email, password} = Object.fromEntries(formData);

    await login(email, password);

    form.reset();
    context.authenticatedNav();
    context.redirect('/');
}
