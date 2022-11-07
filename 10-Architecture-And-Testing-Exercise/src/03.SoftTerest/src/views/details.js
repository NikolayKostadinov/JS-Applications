import {deleteById, getById} from "../api/data.js";
import {getUserData} from "../api/users_store.js";

const section = document.getElementById('detailsPage');

section.addEventListener('click', onDeleteClick);

let context = null;
export async function showDetails(inContext, id) {
    context = inContext;
    const details = await getById(id);
    console.log(details);
    section.replaceChildren(createDetails(details));
    context.showSection(section);
}

function createDetails(data) {
    const fragment = document.createDocumentFragment();
    const img = document.createElement('img');
    img.className = 'det-img';
    img.src = data.img;

    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.innerHTML = `
                <h2 class="display-5">${data.title}</h2>
                <p class="infoType">Description:</p>
                <p class="idea-description">${data.description}</p>`;

    fragment.appendChild(img);
    fragment.appendChild(desc);

    const userData = getUserData();
    if (userData && data._ownerId === userData._id) {
        const cmd = document.createElement('div');
        cmd.className = 'text-center';
        cmd.innerHTML = `<a class="btn detb" data-id = "${data._id}" href="">Delete</a>`
        fragment.appendChild(cmd);
    }

    return fragment;
}

async function onDeleteClick(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        const id = event.target.dataset.id;
        if (id) {
            await deleteById(id);
            context.redirect('/catalog');
        }
    }

}
