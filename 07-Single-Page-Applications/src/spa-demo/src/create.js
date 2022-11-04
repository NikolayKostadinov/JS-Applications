import {showCatalog} from "./catalog.js";

const section = document.getElementById('create-view');
section.remove();
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

export function showCreate() {
    document.querySelector('main').replaceChildren(section);
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const {title} = Object.fromEntries(formData);
    form.querySelectorAll('input')
        .forEach(i => i.value = '');
    try {
        const accessToken = JSON.parse(sessionStorage.getItem('userData')).accessToken;
        const response = await fetch('http://localhost:3030/data/movies',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': accessToken
                },
                body: JSON.stringify({title})
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        showCatalog();
    } catch (err) {
        alert(err.message);
    }
}
