import {logout} from "../api/users.js";

export function executeLogout(context){
    logout()
    context.authenticatedNav();
    context.redirect('/');
}
