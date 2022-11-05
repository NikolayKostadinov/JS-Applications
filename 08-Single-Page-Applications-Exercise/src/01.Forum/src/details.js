const container = document.querySelector('.container');
const section = document.querySelector('.theme-content');
const form = section.querySelector('form');
const theme = section.querySelector('.theme-name-wrapper');
const commentsElement = section.querySelector('div#user-comment');
section.remove();
form.addEventListener('submit', onSubmit);

export async function showDetails(postId) {
    loadTheme(postId);
    loadComments(postId);

    form.dataset.id = postId;
    container.replaceChildren(section);
}

async function loadTheme(postId) {
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`);

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        const post = data;
        section.querySelector('.theme-name').innerHTML = `<h2>${post.title}</h2>`;
        section.querySelector('div.comment div.header').innerHTML =
            `<img src="./static/profile.png" alt="avatar">
                <p><span>${post.username}</span> posted on
                    <time>${new Date(data.postTime).toLocaleString('sv')}</time>
                </p>
                <p class="post-content">${post.content}</p>`;
    } catch (err) {
        alert(err.message);
    }
}

function toComment(comment) {
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

async function loadComments(postId) {
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);

        let commentsData = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        const comments = Object.values(commentsData).filter(c => c.postId === postId);
        commentsElement.replaceChildren(...comments.map(toComment))


    } catch (err) {
        alert(err.message);
    }
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const {username, postText} = Object.fromEntries(formData);
    try {
        if (postText === '') throw Error('Comment required!');
        if (username === '') throw Error('Username required!');
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        postId: form.dataset.id,
                        username: username,
                        text: postText,
                        postTime: new Date()
                    })
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        commentsElement.appendChild(toComment(data));
        form.reset();
    } catch (err) {
        alert(err.message);
    }
}
