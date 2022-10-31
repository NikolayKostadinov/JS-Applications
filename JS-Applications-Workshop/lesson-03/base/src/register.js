document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    try {

        if (data.email === '' || data.password === '') {
            throw new Error('All files are required!');
        }

        if (data.password.localeCompare(formData.get('rePass')) !== 0) {
            throw new Error('Passwords must be the same');
        }

        const request = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
