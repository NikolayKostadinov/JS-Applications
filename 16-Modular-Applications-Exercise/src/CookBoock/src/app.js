import page from '../node_modules/page/page.mjs';
import { updateNav } from './middlewares/navbar.js';
import {parseQueryString} from "./middlewares/query_string.js";
import { decorateContext } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import {catalogPage} from "./views/catalog.js";
import {createPage} from "./views/create.js";
import {homePage} from './views/home.js';
import {loginPage} from "./views/login.js";
import {registerPage} from "./views/register.js";

page(addSession);
page(updateNav);
page(decorateContext);
page(parseQueryString);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/catalog', catalogPage);
page('/create', createPage);

page.start();
