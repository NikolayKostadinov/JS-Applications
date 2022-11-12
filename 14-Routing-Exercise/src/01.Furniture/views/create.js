import {html} from "../node_modules/lit-html/lit-html.js";
import {createFurniture, validate, validResult} from "../api/data.js";
import {classMap} from "../node_modules/lit-html/directives/class-map.js";

const createTemplate = (validationResult) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class=${classMap({
                        'form-control': true,
                        'is-valid': validationResult.make,
                        'is-invalid': !validationResult.make
                    })} id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class=${classMap({
                        'form-control': true,
                        'is-valid': validationResult.model,
                        'is-invalid': !validationResult.model
                    })} id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class=${classMap({
                        'form-control': true,
                        'is-valid': validationResult.year,
                        'is-invalid': !validationResult.year
                    })} id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class=${classMap({
                        'form-control': true,
                        'is-valid': validationResult.description,
                        'is-invalid': !validationResult.description
                    })} id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class=${classMap({
                        'form-control': true,
                        'is-valid': validationResult.price,
                        'is-invalid': !validationResult.price
                    })} id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class=${classMap({
                        'form-control': true,
                        'is-valid': validationResult.img,
                        'is-invalid': !validationResult.img
                    })} id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create"/>
            </div>
        </div>
    </form>`;

let ctx = null;

export function createView(inCtx) {
    ctx = inCtx;
    ctx.render(createTemplate(validResult));
}


async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const furniture = Object.fromEntries(formData);
    const validationResult = validate(furniture);
    if (!validationResult.isValid) {
        ctx.render(createTemplate(validationResult));
        return;
    }
    await createFurniture(furniture);
    ctx.page.redirect('/');
}
