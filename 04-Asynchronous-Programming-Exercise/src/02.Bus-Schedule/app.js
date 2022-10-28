function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';
    let stopId = 'depot';
    const infoElement = document.querySelector('div#info span.info');
    const btnDepart = document.getElementById('depart');
    const btnArrive = document.getElementById('arrive');

    function toggleAvailability(element) {
        element.disabled = !element.disabled;
    }

    function toggleButtons() {
        toggleAvailability(btnArrive);
        toggleAvailability(btnDepart);
    }

    async function getData() {
        let response = await fetch(baseUrl + stopId);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} (${response.statusText})`);
        }

        return await response.json();
    }

    async function depart() {
        try {
            const stopData = await getData();
            infoElement.textContent = `Next stop ${stopData.name}`;
            toggleButtons();
        } catch (e) {
            infoElement.textContent = 'Error';
            btnArrive.disable = true;
            btnArrive.disable = true;
        }
    }

    async function arrive() {
        const stopData = await getData();
        infoElement.textContent = `Arriving at ${stopData.name}`;
        stopId = stopData.next;
        toggleButtons();
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
