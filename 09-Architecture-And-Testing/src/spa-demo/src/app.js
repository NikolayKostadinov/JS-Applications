import {showAbout} from "./about.js";
import {showCatalog} from "./catalog.js";
import {showCreate} from "./create.js";
import {showHome} from "./home.js";
import {showLogin} from "./login.js";
import {showRegister} from "./register.js";

import {render} from "./dom.js";
import {checkUserNav, onLogout} from "./utils.js";

document.querySelector('nav').addEventListener('click', onNavigate);

const sections = {
    homeBtn: showHome,
    catalogBtn: showCatalog,
    aboutBtn: showAbout,
    loginBtn: showLogin,
    registerBtn: showRegister,
    createBtn: showCreate,
    logoutBtn: onLogout,
}

checkUserNav();

// starts application in home view
navigateTo('homeBtn');

function onNavigate(ev) {
    if (ev.target.tagName === 'A') {
        if (navigateTo(ev.target.id)) {
            ev.preventDefault();
        }
    }
}

function navigateTo(viewName){
    const view = sections[viewName];

    const isView = typeof view === 'function';
    if (isView) {
        view({render, navigateTo, checkUserNav});
    }
    return isView;
}
