async function loadRepos() {
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}/repos`;
    const list = document.getElementById('repos');
    list.innerHTML = '';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        data.forEach(repo => {
            const anchor = document.createElement('a');
            anchor.href = repo.html_url;
            anchor.textContent = repo.full_name
            const li = document.createElement('li');
            li.appendChild(anchor);
            list.appendChild(li);
        });
    } catch (ex) {
        const li = document.createElement('li');
        li.textContent = ex.message;
        list.appendChild(li);
    }
}

// async function loadRepos() {
//     const username = document.getElementById('username').value;
//     const url = `https://api.github.com/users/${username}/repos`;
//     const list = document.getElementById('repos');
//
//     fetch(url)
//         .then(handleResponse)
//         .then(displayData)
//         .catch(displayError);
//
//     function handleResponse(response) {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//
//         }
//         return response.json();
//
//     }
//
//     function displayData(data) {
//         list.innerHTML = '';
//         data.forEach(({html_url, full_name}) => {
//             const anchor = document.createElement('a');
//             anchor.href = html_url;
//             anchor.textContent = full_name;
//             const li = document.createElement('li');
//             li.appendChild(anchor);
//             list.appendChild(li);
//         });
//     }
//
//     function displayError(ex) {
//         list.innerHTML = '';
//         const li = document.createElement('li');
//         li.textContent = ex.message;
//         list.appendChild(li);
//     }
// }
