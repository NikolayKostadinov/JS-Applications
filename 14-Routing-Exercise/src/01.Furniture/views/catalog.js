import {html} from "../node_modules/lit-html/lit-html.js";
import {repeat} from "../node_modules/lit-html/directives/repeat.js";
import {getFurnitureCatalog} from "../api/data.js";

const furnitureTemplate = (furniture) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${furniture.img}/>
                <p>${furniture.description}</p>
                <footer>
                    <p>Price: <span>${furniture.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${furniture._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>`;

const catalogTemplate = (catalog) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${repeat(catalog, f => f._id, furnitureTemplate)}
    </div>`;

export async function catalogView(ctx) {
    const catalog = await getFurnitureCatalog()
    ctx.render(catalogTemplate(catalog));
}
