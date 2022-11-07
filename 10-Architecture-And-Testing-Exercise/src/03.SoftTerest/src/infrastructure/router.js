import {isAuthenticated} from "../api/users_store.js";

export function initialize(controllers) {
    const main = document.querySelector('main');
    document.querySelector('nav').addEventListener('click', onNavigate);

    const context = {showSection, redirect, authenticatedNav};

    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }

    function onNavigate(event) {
        let target = event.target;
        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName === 'A') {
            event.preventDefault();
            const url = new URL(target.href);
            redirect(url.pathname);
        }
    }

    function redirect(name, ...params) {
        const link = controllers[name];
        if (typeof link === 'function') {
            link(context, ...params);
        }
    }

    function authenticatedNav() {
        const authenticatedNavs = document.querySelectorAll('.authenticated');
        const guestNavs = document.querySelectorAll('.guest');
        if (isAuthenticated()) {
            authenticatedNavs.forEach(li => li.style.display = 'inline-block');
            guestNavs.forEach(li => li.style.display = 'none');
        } else {
            authenticatedNavs.forEach(li => li.style.display = 'none');
            guestNavs.forEach(li => li.style.display = 'inline-block');
        }
    }
}
