import {html, render} from "../../node_modules/lit-html/lit-html.js";
import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {getRecipe} from "../api/data.js";


const ingredientTemplate = (ing) => html`
    <li>${ing}</li>`;

const detailsTemplate = (recipe) => recipe ? html`
    <h1>${recipe.name}</h1>
    <h2>Ingredients</h2>
    <ul>${repeat(recipe.ingredients, (item, index) => index, ingredientTemplate)}
    </ul>  
    <h2>Steps</h2>
    <ul>${repeat(recipe.steps, (item, index) => index, ingredientTemplate)}
    </ul>` : "Loading...";

export async function showDetails(ctx) {
    ctx.render(detailsTemplate());
    const id = ctx.params.recipeId;
    const recipe = await getRecipe(id);
    ctx.render(detailsTemplate(recipe));
}
