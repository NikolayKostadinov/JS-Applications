import {html, render} from "../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {getRecipe} from "../api/data.js";


const ingredientTemplate = (ing) => html`<li>{ing}</li>`;

const detailsTemplate = (recipe) => html`
    <h1>${recipe.name}</h1>
    <h2>Ingredients</h2>
    <ul>${recipe.ingredients.map(ingredientTemplate)}</ul>`;

export async function showDetails(ctx) {
    ctx.render(detailsTemplate({}));
    const id = ctx.params.recipeId;
    const recipe = await getRecipe(id);
    ctx.render(detailsTemplate(recipe));
}
