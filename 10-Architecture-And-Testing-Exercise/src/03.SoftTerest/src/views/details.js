import {getById} from "../api/data.js";

const section = document.getElementById('detailsPage');

export async function showDetails(context, id) {
    const details = await getById(id);
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

    const cmd = document.createElement('div');
    cmd.className = 'text-center';
    cmd.innerHTML= `<a class="btn detb" data-id = "${data._id}" href="">Delete</a>`

    fragment.appendChild(img);
    fragment.appendChild(desc);
    fragment.appendChild(cmd);


    return fragment;
}
