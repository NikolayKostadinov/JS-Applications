import * as api from './api.js';

const endpoints = {
    allRecipes: '/data/recipes',
    recipeById: '/data/recipes/',
    login: '/users/login'
}

export async function getAllRecipes() {
    return api.get(endpoints.allRecipes);
}

export async function getRecipe(id) {
    return api.get(endpoints.recipeById + id);
}

export async function login(user) {
    return api.post(endpoints.login, user);
}
