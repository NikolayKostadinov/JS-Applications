import {register} from "../api/users.js";

const samePasswordMessage = 'Passwords must be the same';

const section = document.getElementById('registerPage')
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

let context = null;

export function showRegister(inContext) {
    context = inContext
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const {email, password, repeatPassword} = Object.fromEntries(formData);
    if (password !== repeatPassword) {
        alert(samePasswordMessage);
    } else {
        await register(email, password);

        form.reset();
        context.authenticatedNav();
        context.redirect('/');
    }
}
