async function lockedProfile() {
    const main = document.getElementById('main');
    main.innerHTML = '';

    const users = await getData(`http://localhost:3030/jsonstore/advanced/profiles`);

    function appendProfileElement(user, ix) {
        const namePrefix = `user${ix + 1}`;
        user.locked = true;

        function toggleProfile(ev) {
            ev.preventDefault();
            if (!user.locked) {
                hidden.style.display = hidden.style.display === 'none' ? 'block' : 'none';
                btnSubmit.textContent = btnSubmit.textContent === 'Show more' ? 'Hide it' : 'Show more';
                user.locked = true;
                locked.checked = true;
                unlocked.checked = false;
            }
        }

        let hidden = ce('div', {id: `${namePrefix}HiddenFields`},
            ce('hr'),
            ce('label', {}, 'Email:'),
            ce('input', {
                type: 'email', name: `${namePrefix}Email`, value: user.email, disabled: true, readonly: true
            }),
            ce('label', {}, 'Age:'),
            ce('input', {type: 'email', name: `${namePrefix}Email`, value: user.age, disabled: true, readonly: true})
        );
        hidden.style.display = 'none';

        let btnSubmit = ce('button', {onclick: toggleProfile}, 'Show more');
        let locked = ce('input', {
            type: 'radio', name: `${namePrefix}Locked`, value: 'lock', onclick: () => {
                user.locked = true
            }
        });

        locked.checked = true;

        let unlocked = ce('input', {
            type: 'radio', name: `${namePrefix}Locked`, value: 'unlock', onclick: () => {
                user.locked = false
            }
        });
        const profile = ce('div', {className: 'profile'},
            ce('img', {src: './iconProfile2.png', className: 'userIcon'}),
            ce('label', {}, 'Lock'),
            locked,
            ce('label', {}, 'Unlock'),
            unlocked,
            ce('hr'),
            ce('label', {}, 'Username'),
            ce('input', {
                type: 'text',
                name: `${namePrefix}Username`,
                value: user.username,
                disabled: true,
                readonly: true
            }, 'Username'),
            ce('div', {className: `${namePrefix}Username`},
                hidden
            ),
            btnSubmit
        );
        main.appendChild(profile);
    }

    Object.values(users)
        .forEach(appendProfileElement);

    async function getData(url) {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} (${response.statusText})`);
        }

        return await response.json();
    }
}

function ce(type, attributes, ...content) {
    const result = document.createElement(type);

    Object.entries(attributes || {})
        .forEach(([attribute, value]) => {
            if (isEventListener(attribute)) {
                result.addEventListener(attribute.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attribute] = value;
            }
        });

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (isElement(e)) {
            result.appendChild(e);
        } else {
            const node = document.createTextNode(e);
            result.appendChild(node);
        }
    });

    return result;

    function isEventListener(attr) {
        return attr.substring(0, 2).localeCompare('on') === 0;
    }

    function isElement(element) {
        return typeof element != 'string' && typeof element != 'number';
    }
}
