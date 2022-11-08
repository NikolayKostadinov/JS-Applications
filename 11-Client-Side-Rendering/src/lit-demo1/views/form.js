import {html} from '../node_modules/lit-html/lit-html.js'
export const formTemplate=(onSubmit) => html`
    <form @submit=${onSubmit}>
        <label>Title <input type="text" name="title"></label>
        <label>Author <input type="text" name="author"></label>
        <label>Content <textarea type="text" name="content" rows="5" cols="20"></textarea></label>
        <input type="submit" value="Create" >
    </form>`;
