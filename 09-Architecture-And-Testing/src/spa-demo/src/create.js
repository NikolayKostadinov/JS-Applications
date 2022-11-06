import {post} from "./api.js";
import {attachViewSection, createSubmitHandler} from "./dom";

const section = attachViewSection('create-view');

const form = section.querySelector('form');
createSubmitHandler(form, onCreateMovie)

let ctx = null;
export function showCreate(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onCreateMovie({title}) {
    try {
        await post('/data/movies', {title});
        form.reset();
        ctx.navigateTo('catalogBtn');
    } catch (err) {
        alert(err.message);
    }
}
