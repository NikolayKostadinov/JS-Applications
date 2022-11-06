import {post, setUserData} from "./api.js";

import {ensureAreEqual, ensureNotEmpty} from "./validation.js";
import {attachViewSection, createSubmitHandler} from "./dom.js";

const section = attachViewSection('register-view')
const form = section.querySelector('form');

createSubmitHandler(form, onRegister)


let ctx = null;

export async function showRegister(inCtx) {
    ctx = inCtx
    ctx.render(section);
}

async function onRegister({email, password, rePass}) {
    try {
        validate(email, password, rePass);

        const {_id, email, accessToken} = await post('/users/register', {email, password})
        setUserData({id: _id, email, accessToken});
        form.reset();

        ctx.checkUserNav();
        ctx.navigateTo('homeBtn');
    } catch (err) {
        alert(err.message);
    }
}

function validate(email, password, rePass) {
    ensureNotEmpty(email, 'Email is required!');
    ensureNotEmpty(password, 'Password is required!');
    ensureAreEqual(password, rePass, 'Passwords must be equal!')
}
