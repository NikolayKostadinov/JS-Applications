const section = document.getElementById('catalog-view');
section.remove();

export async function showCatalog() {
    document.querySelector('main').replaceChildren(section);
    const catalog = section.querySelector('ul#catalog');
    catalog.replaceChildren('Loading ...');

    const response = await fetch('http://localhost:3030/data/movies');
    const movies = await response.json();

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
