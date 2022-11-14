import {html} from "../../node_modules/lit-html/lit-html.js";
import {until} from "../../node_modules/lit-html/directives/until.js";
import {repeat} from "../../node_modules/lit-html/directives/repeat.js";
import {createSubmitHandler} from "../utils.js";
import {getCommentsByCarId} from "../api/comments.js";

const commentsTemplate = (comments, commentForm) => html`
    <div id="comments">
        ${commentForm}
        <ul class="comments-list">
            ${repeat(comments, c => c._id, commentCard)}
        </ul>
    </div>`;

const commentCard = comment => html`
    <li>${comment.content}</li>
`;

const formTemplate = (onSubmit) => html`
<form @submit = ${onSubmit}>
    <textarea name="content" cols="30" rows="10"></textarea>
    <input type="submit" value="Post comment">
</form>`

export function commentsView(ctx) {
    return until(commentWrapper(ctx), 'Loading comments...');
}

async function commentWrapper(ctx) {
    const carId = ctx.params.id;
    const comments = await getCommentsByCarId(carId);
    return commentsTemplate(comments, formTemplate(createSubmitHandler(onSubmit)));
}

function onSubmit(data, form) {

    form.reset();
}
