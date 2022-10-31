document.querySelector('form').addEventListener('submit', onSubmit);

function isValid(data) {
    if (data.email === '') {
        document.querySelector('[name="email"]').classList.add('error');
    } else {
        document.querySelector('[name="email"]').classList.remove('error');
    }

    if (data.password === '') {
        document.querySelector('[name="password"]').classList.add('error');
    } else {
        document.querySelector('[name="password"]').classList.remove('error');
    }

    return data.email !== '' && data.password !== '';
}

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const data = {
        email: formData.get('email'), password: formData.get('password')
    }

    if (isValid(data)) {
        try {
            const request = await fetch('http://localhost:3030/users/login', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(data)
            })

            if (!request.ok) {
                const err = await request.json();
                throw new Error(err.message);
            }

            const response = await request.json();

            sessionStorage.setItem('accessToken', response.accessToken);

            window.location = 'index.html';

        } catch (err) {
            alert(err.message);

        }
    }
}
