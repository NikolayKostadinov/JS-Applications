import {showHome} from "./home.js";
import {showCatalog} from "./catalog.js";
import {showAbout} from "./about.js";
import {showLogin} from "./login.js";
import {showRegister} from "./register.js";
import {showCreate} from "./create.js";
import {checkUserNav, onLogout} from "./utils.js";

checkUserNav();

const sections = {
    homeBth: showHome,
    catalogBtn: showCatalog,
    aboutBtn: showAbout,
    loginBtn: showLogin,
    registerBtn: showRegister,
    createBtn: showCreate,
}

document.querySelector('nav').addEventListener('click', onNavigate);
document.getElementById('logoutBtn').addEventListener('click', onLogout);

await showHome();

function onNavigate(ev) {
    if (ev.target.tagName === 'A') {
        const view = sections[ev.target.id];

        if (typeof view === 'function') {
            ev.preventDefault();
            view();
        }
    }
}
