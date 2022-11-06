import {post, setUserData} from "./api.js";

import {ensureNotEmpty} from "./validation.js";
import {attachViewSection, createSubmitHandler} from "./dom";

const section = attachViewSection('login-view');

const form = section.querySelector('form');
createSubmitHandler(form, onLogin);

let ctx = null;
export async function showLogin(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onLogin({email, password}) {
    try {
        ensureNotEmpty(email, 'Email is required!');
        ensureNotEmpty(password, 'Password is required!');

        const {_id, email, accessToken} = await post('/users/login', {email, password});
        setUserData({id: _id, email, accessToken});
        ctx.checkUserNav();
        ctx.navigateTo('homeBtn');
    } catch (err) {
        alert(err.message);
    }
}
