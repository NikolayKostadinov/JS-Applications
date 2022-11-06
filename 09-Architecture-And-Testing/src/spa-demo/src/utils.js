import {get, getUserData, clearUserData} from "./api.js";

function checkUserNav() {
    const userData = getUserData();
    const guestNav = document.querySelector('#guest-nav');
    const registeredNav = document.querySelector('#registered-nav');

    userData ? showAuthorizedNavigation(userData, guestNav, registeredNav) : showGuestNavigation(guestNav, registeredNav);
}

function showAuthorizedNavigation(userData, guestNav, registeredNav) {
    document.getElementById('greeting').textContent = `Welcome, ${userData.email}!`;
    guestNav.style.display = 'none';
    registeredNav.style.display = 'inline-block';
}

function showGuestNavigation(guestNav, registeredNav) {
    guestNav.style.display = 'inline-block';
    registeredNav.style.display = 'none';
}

async function onLogout(ctx) {
    get('/users/logout');
    clearUserData();
    ctx.checkUserNav();
    ctx.navigateTo('homeBtn');
}

export {checkUserNav, onLogout}
