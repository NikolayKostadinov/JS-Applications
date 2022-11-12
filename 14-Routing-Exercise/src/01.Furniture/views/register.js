import {html} from "../node_modules/lit-html/lit-html.js";
import {register} from "../api/users.js";

const registerTemplate = html` <div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
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
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

let ctx = null;

export function registerView(inCtx){
    ctx = inCtx;
    ctx.render(registerTemplate);
}

async function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (data.email==='' || data.password ===''){
        alert('All fields are required!');
        return;
    }
    if (data.password !== data.rePass){
        alert('Passwords must be the same!');
        return;
    }
    await register(data.email, data.password);
    ctx.authenticatedNav();
    ctx.page.redirect('/');
}
