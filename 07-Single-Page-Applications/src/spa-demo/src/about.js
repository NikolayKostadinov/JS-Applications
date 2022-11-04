const section = document.getElementById('about-view');
section.remove();

export async function showAbout() {
    document.querySelector('main').replaceChildren(section);
}
