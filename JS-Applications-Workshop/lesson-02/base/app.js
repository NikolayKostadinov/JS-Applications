async function getAJAXData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} (${response.statusText})`);
    }

    return await response.json();
}

async function getRecipes() {
    const data = await getAJAXData('http://localhost:3030/jsonstore/cookbook/recipes');
    return Object.values(data);
}

function createRecipe(recipe) {
    let article = createElement('article', {className: 'preview', onclick: getDetails},
        createElement('div', {className: 'title'},
            createElement('h2', null, recipe.name)),
        createElement('div', {className: 'small'},
            createElement('img', {src: recipe.img}))
    );

    return article;

    async function getDetails() {
        const recipeDetails = await getAJAXData(`http://localhost:3030/jsonstore/cookbook/details/${recipe._id}`);
        article.replaceWith(createRecipeDetails(recipeDetails));
    }
}


function createRecipeDetails(recipe) {
    return createElement('article', null,
        createElement('h2', null, recipe.name),
        createElement('div', {className: 'band'},
            createElement('div', {className: 'thumb'}, createElement('img', {src: recipe.img})),
            createElement('div', {className: "ingredients"},
                createElement('h3', null, "Ingredients:"),
                createElement('ul', null, recipe.ingredients.map(i => createElement('li', null, i)))
            )
        ),
        createElement('div', {className: 'description'},
            createElement('h3', null, "Preparation:"),
            recipe.steps.map(step => createElement('p', null, step))
        )
    );
}

window.addEventListener('load', async () => {
    const recipes = await getRecipes();
    const main = document.querySelector('main');

    main.innerHTML = '';

    recipes
        .map(recipe => createRecipe(recipe))
        .forEach(recipe => main.appendChild(recipe))
});

function createElement(type, attributes, ...content) {
    const result = document.createElement(type);

    Object.entries(attributes || {})
        .forEach(([attribute, value]) => {
            if (isEventListener(attribute)) {
                result.addEventListener(attribute.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attribute] = value;
            }
        });

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (isElement(e)) {
            result.appendChild(e);
        } else {
            const node = document.createTextNode(e);
            result.appendChild(node);
        }
    });

    return result;

    function isEventListener(attr) {
        return attr.substring(0, 2).localeCompare('on') === 0;
    }

    function isElement(element) {
        return typeof element != 'string' && typeof element != 'number';
    }
}
