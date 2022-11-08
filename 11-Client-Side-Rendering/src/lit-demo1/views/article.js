import {html} from "../node_modules/lit-html/lit-html.js";
import {classMap} from "../node_modules/lit-html/directives/class-map.js";

export const articleTemplate = (article) => html`
    <article class=${classMap({
    highlight: article.highlight,
    red: article.class ==='red',
    yellow: article.class ==='yellow',
    green: article.class ==='green',
})}>
        <h2>${article.title}</h2>
        ${article.highlight ? html`<h3>Article of the day</h3>` : null}
        <div class="content">
            <p>
                ${article.content}
            </p>
        </div>
        <footer>Author: <span style="font-style: italic">${article.author}</span></footer>
    </article>`
