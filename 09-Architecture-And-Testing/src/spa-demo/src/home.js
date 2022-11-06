import {attachViewSection} from "./dom";

const section = attachViewSection('home-view')

export function showHome(ctx) {
    ctx.render(section);
}
