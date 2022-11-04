const section = document.getElementById('home-view');
section.remove();

export function showHome() {
    document.querySelector('main').replaceChildren(section);
}
