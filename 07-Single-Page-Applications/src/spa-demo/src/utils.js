import {showHome} from "./home.js";

export function checkUserNav() {
    const sessionData = sessionStorage.getItem('userData');
    const userData = JSON.parse(sessionData);

    const guestNav = document.querySelector('#guest-nav');
    const registeredNav = document.querySelector('#registered-nav');

    if (userData) {
        document.getElementById('greeting').textContent = `Welcome, ${userData.email}!`;
        guestNav.style.display = 'none';
        registeredNav.style.display = 'inline-block';
    } else {
        guestNav.style.display = 'inline-block';
        registeredNav.style.display = 'none';
    }
}

export function onLogout(ev) {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    fetch('http://localhost:3030/users/logout',
        {
            method: "GET",
            headers: {
                'X-Authorization': userData.accessToken
            }
        });

    sessionStorage.removeItem('userData');
    checkUserNav();
    showHome();
}
