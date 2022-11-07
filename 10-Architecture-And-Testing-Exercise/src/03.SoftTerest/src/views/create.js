import {createIdea} from "../api/data.js";

const section = document.getElementById('createPage');

const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

let context = null;
export function showCreate(inContext) {
    context = inContext
    context.showSection(section);
}

async function onSubmit(event) {
    event.preventDefault();
    event.preventDefault();
    const formData = new FormData(form);
    const {title, description, imageURL} = Object.fromEntries(formData);

    await createIdea({title, description, img: imageURL});

    form.reset();
    context.redirect('/catalog');
}
