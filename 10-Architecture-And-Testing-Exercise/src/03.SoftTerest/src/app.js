import {showHome} from "./views/home.js";
import {showRegister} from "./views/register.js";
import {showLogin} from "./views/login.js";
import {showCatalog} from "./views/catalog.js";
import {showDetails} from "./views/details.js";
import {showCreate} from "./views/create.js";
import {executeLogout} from "./views/logout.js";
import {initialize} from "./infrastructure/router.js";

// init application
const controllers = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/catalog': showCatalog,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': executeLogout,
}

document.getElementById('views').remove();

const router = initialize(controllers);

// Start application
router.authenticatedNav();
router.redirect('/');
