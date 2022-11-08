import data from './data.json' assert {type: 'json'};
import {render} from "./node_modules/lit-html/lit-html.js";
import {repeat} from "./node_modules/lit-html/directives/repeat.js";

import {articleTemplate} from "./views/article.js";
import {formTemplate} from "./views/form.js";

const main = document.querySelector('main');
const header = document.querySelector('header');

window.data = data;
window.update = update;

start();

function start() {
    update();
}

function update() {
    render(formTemplate(onSubmit), header)
    render(repeat(data, a=>a.id, articleTemplate.bind(null, onDelete)), main);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const article = Object.fromEntries(formData);
    article.id = (Math.random() * 9999 | 0).toString();
    article.class = 'new'
    data.push(article);

    event.target.reset();
    update();
}

function onDelete(index) {
    data.splice(index, 1);
    update();
}
