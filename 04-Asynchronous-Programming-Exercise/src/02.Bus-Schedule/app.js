function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';
    function depart() {
        console.log('Depart TODO...');
    }

    function arrive() {
        console.log('Arrive TODO...');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
