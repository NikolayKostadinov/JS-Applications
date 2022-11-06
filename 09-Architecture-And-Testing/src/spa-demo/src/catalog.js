import {get} from "./api.js";

const section = document.getElementById('catalog-view');

export async function showCatalog(ctx) {
    ctx.render(section);
    const catalog = section.querySelector('ul#catalog');
    catalog.replaceChildren('Loading ...');

    const movies = await get('/data/movies');

    const fragment = document.createDocumentFragment();
    movies.map(createMovieItem)
        .forEach(i => fragment.appendChild(i));
    catalog.replaceChildren(fragment);
}

function createMovieItem(movie) {
    const li = document.createElement('li');
    li.textContent = movie.title;
    return li;
}
