import {html} from "../node_modules/lit-html/lit-html.js";
import {classMap} from "../node_modules/lit-html/directives/class-map.js";

export const articleTemplate = (onDelete, article, index) => html`
    <article class=${classMap({
        highlight: article.highlight,
        red: article.class === 'red',
        yellow: article.class === 'yellow',
        green: article.class === 'green',
        blue: article.class ==='new',
    })}>
        <h2>${article.title}</h2>
        <button @click=${()=>onDelete(index)}>Delete</button>
        <div class="content">
            <p>
                ${article.content}
            </p>
        </div>
        <footer>Author: <span style="font-style: italic">${article.author}</span></footer>
    </article>`
