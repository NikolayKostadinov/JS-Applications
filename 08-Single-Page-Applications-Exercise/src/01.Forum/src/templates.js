export function createPostHeading(data){
    const div = document.createElement('div');
    div.className = 'topic-name-wrapper';
    div.innerHTML =
        `<div class="topic-name">
            <p><strong>${comment.username}</strong> commented on
                <time>${new Date(comment.postTime).toLocaleString('en-US')}</time>
            </p>
            <div class="post-content">
                <p>${comment.text}</p>
            </div>
        </div>`;

    return div;
}
