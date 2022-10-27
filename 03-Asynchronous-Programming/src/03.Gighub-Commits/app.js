async function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;

    list.innerHTML = '';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} (${response.statusText})`);
        }

        const data = await response.json();
        data.forEach(({commit}) => {
            const li = document.createElement('li');
            li.textContent = `${commit.author.name}: ${commit.message}`;
            list.appendChild(li);
        });
    } catch (ex) {
        const li = document.createElement('li');
        li.textContent = ex.message;
        list.appendChild(li);
    }
}
