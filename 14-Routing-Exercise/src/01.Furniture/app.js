import page from "./node_modules/page/page.mjs";
import {render as litRender} from "./node_modules/lit-html/lit-html.js";
import {getUserData, isAuthenticated} from "./api/users_store.js";

//--------- views ------------------
import {registerView} from "./views/register.js";
import {loginView} from "./views/login.js";
import {logoutView} from "./views/logout.js";
import {catalogView} from "./views/catalog.js";
import {detailsView, onDelete} from "./views/details.js";
import {editView} from "./views/edit.js";
import {createView} from "./views/create.js";
import {myFurnitureView} from "./views/my-furniture.js";

const container = document.querySelector('div.container');
page(decorateContext);
page('/', catalogView);
page('/register', registerView);
page('/login', loginView);
page('/logout', logoutView);
page('/create', createView);
page('/myFurniture', myFurnitureView);
page('/details/:id', detailsView);
page("/delete/:id", onDelete);
page('/edit/:id', editView);
page('*', notFound);

page.start();
authenticatedNav();

function render(templateResult){
    litRender(templateResult, container);
}

function decorateContext(ctx, next){
    ctx.render = render;
    ctx.authenticatedNav = authenticatedNav;
    ctx.isAuthenticated = isAuthenticated();
    ctx.currentUser = getUserData();
    next(ctx);
}

function notFound(ctx) {
    ctx.render('404 Not Found')
}

function authenticatedNav() {
    if (isAuthenticated()){
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
