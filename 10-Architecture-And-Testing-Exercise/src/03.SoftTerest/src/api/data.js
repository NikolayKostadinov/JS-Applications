import * as api from './api.js';

const endpoints = {
    ideas: '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    create: '/data/ideas',
    ideaById: '/data/ideas/',
    deleteById: '/data/ideas/',
}

export async function getAllIdeas() {
    return api.get(endpoints.ideas);
}

export async function createIdea(idea) {
    return api.post(endpoints.create, idea);
}

export async function getById(id) {
    return api.get(endpoints.ideaById + id);
}

export async function deleteById(id) {
    return api.del(endpoints.deleteById + id);
}
