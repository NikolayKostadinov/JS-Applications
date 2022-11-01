const url = 'http://localhost:3030/jsonstore/messenger';

function attachEvents() {
    document.getElementById('submit').addEventListener('click', onSubmit);
    document.getElementById('refresh').addEventListener('click', onRefresh);
}

async function onSubmit(ev) {
    ev.preventDefault();
    const author = document.querySelector('input[name="author"]').value;
    const content = document.querySelector('input[name="content"]').value;

    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({author, content})
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    console.log(data);
}

async function onRefresh(ev) {
    ev.preventDefault();
    const response = await fetch(url);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    const textResult = Object.values(data)
        .map(({author, content}) => `${author}: ${content}`)
        .join('\n');

    const messages = document.getElementById('messages');
    messages.value = textResult;
}

attachEvents();
