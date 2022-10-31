document.querySelector('form').addEventListener('submit', onSubmit);

async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');
    let data = {name, img, ingredients, steps};

    const token = sessionStorage.getItem('accessToken');
    if (!token){
        alert('Please login!');
        window.location='login.html'
        return;
    }
    try {
        const request = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(data)
        });

        if (!request.ok) {
            const err = await request.json();
            throw new Error(err.message);
        }

        await request.json();


        window.location = 'index.html';

    } catch (err) {
        alert(err.message);

    }

}
