import data from './data.json' assert {type: 'json'};
import {html, render} from "./node_modules/lit-html/lit-html.js";
import {articleTemplate} from "./views/article.js";



const templateResult = (name, number) => html`<h2>Welcome ${name}! Clicked ${number} times.</h2>`;
const timerTemplate = (time) => html`<h3>${time.hours}:${time.minutes}:${time.seconds}</h3>`;

start();

function start() {
    document.getElementById('reloadBtn').addEventListener('click', onClick);
    const main = document.querySelector('main');
    render(data.map(articleTemplate), main);
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date();
    const time = {
        hours: ('0' + now.getHours()).slice(-2),
        minutes: ('0' + now.getMinutes()).slice(-2),
        seconds: ('0' + now.getSeconds()).slice(-2)
    };
    render(timerTemplate(time), document.getElementById('timer'));
}

let count = 1;

function onClick() {
    const header = document.querySelector('header');
    const name = 'Pesho';
    render(templateResult(name, count++), header);
}
