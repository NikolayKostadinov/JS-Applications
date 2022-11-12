import {logout} from "../api/users.js";

export function logoutView(ctx){
    logout();
    ctx.authenticatedNav();
    ctx.page.redirect('/');
}
