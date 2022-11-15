import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {html, nothing} from '../../node_modules/lit-html/lit-html.js';
import {getAll} from "../api/recipe.js";

const previewTemplate = (recipe) => html `
    <a class="card" href="/catalog/${recipe._id}">
        <article class="preview">
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small"><img src="${recipe.img}"></div>
        </article>
    </a>`;

const catalogTemplate = (recipes, page, pages) => html`
    <section id="catalog">
        <div class="section-title">
            <form id="searchForm">
                <input type="text" name="search">
                <input type="submit" value="Search">
            </form>
        </div>
        
        ${pager(page, pages)}

        ${repeat(recipes, r=>r._id, previewTemplate)}
        
        ${pager(page, pages)}

    </section>`;

const pager = (page, pages) => {
    return html`
        <header class="section-title">
            Page ${page} of ${pages}
            ${page > 1 ? html`<a class="pager" href="/catalog?page=${page - 1}">&lt;Prev</a>` : nothing}
            ${page < pages ? html`<a class="pager" href="/catalog?page=${page + 1}">Next&gt;</a>` : nothing}
        </header>`;
};

export async function catalogPage(ctx){
    const page = Number(ctx.query.page) || 1;
    const {recipes,pages} = await getAll(page);
    ctx.render(catalogTemplate(recipes, page, pages));
}
