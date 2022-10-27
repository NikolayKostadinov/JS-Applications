async function getInfo() {
    const stopId = document.getElementById('stopId').value;
    const busList = document.getElementById('buses');
    try {
        const stopInfo = await getBusses(stopId);
        document.getElementById('stopName').textContent = stopInfo.name;

        Object.entries(stopInfo.buses)
            .forEach(([busId, time]) => {
                busList.appendChild(ce('li', {}, `Bus ${busId} arrives in ${time} minutes`));
            });
    } catch (ex) {
        document.getElementById('stopName').textContent = "Error";
    }


    async function getBusses(stopId) {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);
        if (!response.ok) {
            throw new Error('Error');
        }

        return await response.json()
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
}
