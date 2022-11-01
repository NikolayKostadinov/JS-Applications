const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);
}

async function onLoad(ev) {
    ev.preventDefault();
    const list = document.getElementById('phonebook');
    list.innerHTML = '';

    try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        Object.values(data)
            .map(createRow)
            .forEach(row => list.appendChild(row));

    } catch (err) {
        alert(err.message);
    }
}

function createRow(data) {
    const row = document.createElement('li');
    row.textContent = `${data.person}: ${data.phone}`;
    const btn = document.createElement('button');
    btn.dataset.id = data._id;
    btn.textContent = 'Delete';
    btn.addEventListener('click', onDelete);
    row.appendChild(btn);
    return row;
}

async function onDelete(ev) {
    let url = baseUrl + '/' + ev.target.dataset.id;

    try {
        const response = await fetch(url, {method: 'DELETE'});
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }
        await response.json();

        ev.target.parentElement.remove();
    } catch (err) {
        alert(err.message);
    }

}

async function onCreate(ev) {
    ev.preventDefault();
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    if (!(person.value && phone.value)) return;

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({person: person.value, phone: phone.value})
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        await response.json();
        person.value = '';
        phone.value = '';
        await onLoad(new Event('click'));
    } catch (err) {
        alert(err.message);
    }
}

attachEvents();
