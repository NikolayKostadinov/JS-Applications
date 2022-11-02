const userData = JSON.parse(sessionStorage.getItem("userData"));
window.addEventListener('DOMContentLoaded', () => {
    toggleUserGuest();
    document.getElementById('logout').addEventListener('click', onLogout);
    document.querySelector('.load').addEventListener('click', onLoad);
    document.getElementById('addForm').addEventListener('submit', onAdd);
    document.getElementById('catches').addEventListener('click', onCaches);
    document.getElementById('catches').innerHTML = '';
})

function toggleUserGuest() {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const addBtn = document.querySelector('.add');
    const greetingName = document.querySelector('p.email span');
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
        greetingName.textContent = userData.email;
        addBtn.disabled = false;
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
        greetingName.textContent = 'guest';
        addBtn.disabled = true;
    }
}

async function onLogout() {
    try {
        const response = await fetch('http://localhost:3030/users/logout',
            {
                method: "GET",
                headers: {'X-Authorization': userData.accessToken}
            });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }

        sessionStorage.removeItem('userData');
        window.location = 'index.html';
    } catch (err) {
        alert(err.message);
    }
}


async function onLoad() {
    try {
        const response = await fetch('http://localhost:3030/data/catches',
            {
                method: 'GET',
                headers: {'X-Authorization': userData.accessToken}
            })

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        console.log(data);
        document
            .getElementById('catches')
            .replaceChildren(...data.map(createCatch));
    } catch (err) {
        alert(err.message);
    }
}

function createCatch(data) {
    const isOwner = userData && data._ownerId === userData.id;

    const div = document.createElement('div');
    div.classList.add('catch');
    div.dataset.id = data._id;

    const html = `
	<label>Angler</label>
	<input type="text" class="angler" value="${data.angler}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Weight</label>
	<input type="text" class="weight" value="${data.weight}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Species</label>
	<input type="text" class="species" value="${data.species}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Location</label>
	<input type="text" class="location" value="${data.location}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Bait</label>
	<input type="text" class="bait" value="${data.bait}" ${
        !isOwner ? 'disabled' : ''
    }>
	<label>Capture Time</label>
	<input type="number" class="captureTime" value="${data.captureTime}" ${
        !isOwner ? 'disabled' : ''
    }>
	<button class="update" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Update
	</button>
	<button class="delete" data-id="${data._ownerId}" ${!isOwner ? 'disabled' : ''}>
		Delete
	</button>
`;
    div.innerHTML = html;
    return div;
}

async function onCaches(ev) {
    ev.preventDefault();

    const id = ev.target.parentElement.dataset.id;
    if (ev.target.tagName === 'BUTTON' && ev.target.className === 'update') {

        const {angler, weight, species, location, bait, captureTime} = Object.fromEntries(
            Array.from(ev.target.parentElement.querySelectorAll("input"))
                .map(i=>[i.className, i.value]));
        try {
            if (angler === '' || weight === '' || species === '' || location === '' || bait === '' || captureTime === '') {
                throw new Error('Required fields!');
            }
            const response = await fetch('http://localhost:3030/data/catches/' + id,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': userData.accessToken
                    },
                    body: JSON.stringify({angler, weight, species, location, bait, captureTime})
                });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            console.log(data);
        } catch (err) {
            alert(err.message);
        }
    }else if (ev.target.tagName ==='BUTTON' && ev.target.className ==='delete' ){
        try{
        const response = await fetch('http://localhost:3030/data/catches/' + id,
            {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.accessToken
                }
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data);
        ev.target.parentElement.remove();
    } catch (err) {
        alert(err.message);
    }
    }
}

async function onAdd(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const {angler, weight, species, location, bait, captureTime} = Object.fromEntries(formData)
    try {
        if (angler === '' || weight === '' || species === '' || location === '' || bait === '' || captureTime === '') {
            throw new Error('Required fields!');
        }
        const response = await fetch('http://localhost:3030/data/catches',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userData.accessToken
                },
                body: JSON.stringify({angler, weight, species, location, bait, captureTime})
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        console.log(data);
        document.getElementById('catches').appendChild(createCatch(data));
        Object.values(ev.target)
            .filter(el => el.nodeName === 'INPUT')
            .forEach(el => (el.value = ''));
    } catch (err) {
        alert(err.message);
    }
}
