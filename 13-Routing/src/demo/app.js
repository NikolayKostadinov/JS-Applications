//import {createHashRouter} from "./hashRouter.js";
import {createHistoryRouter} from "./historyRouter.js";

const main = document.querySelector('main');
const views = {
    '/': () => '<h2>Home Page</h2><p>Welcome to out site</p>',
    '/home': () => '<h2>Home Page</h2><p>Welcome to out site</p>',
    '/catalog': () => '<h2>Catalog</h2><ul><li>Product 1</li><li>Product 2</li><li>Product 3</li></ul>',
    '/about': () => '<h2>About Us</h2><p>+1-555-12345</p>',
}

const getName = createHistoryRouter(main, views, start);

start(getName());

function start(name) {
    const view = views[name];
    const isFunction = typeof view === "function";

    if (isFunction) {
        main.innerHTML = view();
    }

    return isFunction;
}
