function ensureNotEmpty(field, message = 'Required!') {
    if (field === '') {
        throw new Error(message);
    }
}
function ensureAreEqual(field1, field2, message = 'Must be equal!') {
    if (field1 !== field2) {
        throw new Error(message);
    }
}

export {ensureAreEqual,ensureNotEmpty}
