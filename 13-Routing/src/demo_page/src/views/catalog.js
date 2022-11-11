import {html} from "../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {getAllRecipes} from "../api/data.js";

const recipeTemplate = (recipe) => html `<li><a href="/catalog/${recipe._id}">${recipe.name}</a></li>`

const catalogTemplate = (recipes) => html`
    <h2>Catalog</h2>
    <ul>
        ${repeat(recipes, r=>r._id, recipeTemplate)}
    </ul>`;

export async function showCatalog(ctx) {
    ctx.render(catalogTemplate([]));
    const recipes = await getAllRecipes()
    ctx.render(catalogTemplate(recipes));

}
