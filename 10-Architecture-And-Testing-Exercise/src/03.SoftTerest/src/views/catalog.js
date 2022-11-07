import {getAllIdeas} from "../api/data.js";

const section = document.getElementById('dashboard-holder');

section.addEventListener('click', onDetailsSelect)

let context = null;

export async function showCatalog(inContext) {
    context = inContext;
    context.showSection(section);
    const ideas = await getAllIdeas();

    if (ideas.length > 0) {
        section.replaceChildren(...ideas.map(createIdeaPreview));
    } else {
        section.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }
}

function createIdeaPreview(data) {
    const idea = document.createElement('div');
    idea.className = 'card overflow-hidden current-card details';
    idea.style.height = '18rem';
    idea.style.width = '20rem';
    idea.innerHTML = `
            <div class="card-body">
                <p class="card-text">${data.title}</p>
            </div>
            <img class="card-image" src="${data.img}" alt="Card image cap">
            <a class="btn" data-id = ${data._id} href="">Details</a>`;
    return idea;
}

function onDetailsSelect(event) {
    if (event.target.tagName === 'A'){
        const id = event.target.dataset.id;
        if (id){
            event.preventDefault();
            context.redirect('/details', id);
        }
    }
}
