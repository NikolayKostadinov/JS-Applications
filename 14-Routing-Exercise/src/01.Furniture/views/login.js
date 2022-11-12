import {html} from "../node_modules/lit-html/lit-html.js";
import {login} from "../api/users.js";

const loginTemplate = html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit = ${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

let ctx = null;

export function loginView(inCtx){
    ctx = inCtx;
    ctx.render(loginTemplate);
}

async function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    await login(data.email, data.password);
    ctx.authenticatedNav();
    ctx.page.redirect('/');
}
