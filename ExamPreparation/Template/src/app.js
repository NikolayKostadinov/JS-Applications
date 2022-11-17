import page from '../node_modules/page/page.mjs';
import {logout} from "./api/users.js";
import {updateNav} from "./middlevares/navbar.js";
import {parseQueryString} from "./middlevares/query_string.js";
import {decorateContext} from "./middlevares/render.js";
import {addSession} from "./middlevares/session.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(parseQueryString);
page('/login', loginView);
page('/register', registerView);

page.start();

document.getElementById('logout')
    .addEventListener('click', onLogout);

function onLogout() {
    logout();
    page.redirect('/');
}
