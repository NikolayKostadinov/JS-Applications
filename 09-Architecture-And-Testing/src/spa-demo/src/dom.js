function attachViewSection(viewName) {
    const section = document.getElementById(viewName);
    section.remove();
    return section;
}

function render(section){
    document.querySelector('main').replaceChildren(section);
}

function createSubmitHandler(form, callback) {
    form.addEventListener('submit', onSubmit);

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(form);
        callback(Object.fromEntries(formData));
    }

}

export {render, attachViewSection, createSubmitHandler}
