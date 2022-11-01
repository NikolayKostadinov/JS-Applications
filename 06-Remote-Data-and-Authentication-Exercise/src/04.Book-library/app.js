const baseUrl = 'http://localhost:3030/jsonstore/collections/books';
const authorEl = document.querySelector('input[name="author"]');
const titleEl = document.querySelector('input[name="title"]');
const form = document.querySelector('form')
document.getElementById('loadBooks').addEventListener('click', loadBooks);
form.addEventListener('submit', submitBook);

window.addEventListener('load', loadBooks);

async function loadBooks() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        document.querySelector("tbody")
            .replaceChildren(...
                Object.entries(data)
                    .map(createBook));
    } catch (err) {
        alert(err.message);
    }
}

function createCommands(id) {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.dataset.id = id;
    editBtn.addEventListener('click', onEdit);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.id = id;
    deleteBtn.addEventListener('click', onDelete);
    return [editBtn, deleteBtn];
}

function createBook(data) {
    const [id, {author, title}] = data;
    const tr = document.createElement('tr');
    tr.appendChild(createCell(title));
    tr.appendChild(createCell(author));
    tr.append(...createCommands(id));
    return tr;
}

function createCell(data) {
    const cell = document.createElement('td');
    cell.textContent = data;
    return cell;
}

async function onEdit(ev) {
    const id = ev.target.dataset.id;
    try {
        const response = await fetch(baseUrl + '/' + id);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        authorEl.value = data.author;
        titleEl.value = data.title;
        form.querySelector('h3').textContent = "Edit FORM";
        form.dataset.id = id;
        form.dataset.edit = 'true';
    } catch (err) {
        alert(err.message);
    }
}

async function onDelete(ev) {
    ev.preventDefault();
    try {
        const response = await fetch(baseUrl + `/${ev.target.dataset.id}`, {method: "DELETE"});
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        await loadBooks();
    } catch (err) {
        alert(err.message);
    }
}

    async function submitBook(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const author = formData.get('author');
        const title = formData.get('title');
        let url = baseUrl;

        let method = "POST";

        if (!(author && title)) return;

        const inputData = {author, title};
        if (ev.target.dataset.edit) {
            method = "PUT";
            url += '/' + ev.target.dataset.id;
        }
        try {
            const request = await fetch(url,
                {
                    method: method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(inputData)
                });

            const data = await request.json();
            if (!request.ok) {
                throw new Error(data.message);
            }


            authorEl.value = '';
            titleEl.value = '';
            form.querySelector('h3').textContent = "FORM";
            form.dataset.id = '';
            form.dataset.edit = '';

            await loadBooks();
        } catch (err) {
            alert(err);
        }
    }
