import data from './data.json' assert { type: "json" };
import navItems from './nav.json' assert { type: "json" };
import {createTemplate} from "./engine.js";

start();

async function start() {
    const main = document.querySelector('main');
    const nav = document.querySelector('nav ul');

    const articleTemplateAsString = await (await fetch('./templates/article.html')).text();
    const articleTemplate = createTemplate(articleTemplateAsString);

    const navTemplateAsString = await (await fetch('./templates/nav.html')).text();
    const navTemplate = createTemplate(navTemplateAsString);

    main.innerHTML = data.map(articleTemplate).join('');
    nav.innerHTML = navItems.map(navTemplate).join('');
}
