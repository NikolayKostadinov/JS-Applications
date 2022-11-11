import * as api from './api.js';

const endpoints = {
    allRecipes: '/data/recipes',
    recipeById: '/data/recipes/',
    createBook: '/jsonstore/collections/books',
    updateBook: '/jsonstore/collections/books/',
    deleteBook: '/jsonstore/collections/books/',
}

export async function getAllRecipes() {
    return api.get(endpoints.allRecipes);
}

export async function getRecipe(id) {
    return api.get(endpoints.recipeById + id);
}

export async function editBook(book) {
    return api.put(endpoints.updateBook + book.id, book);
}

export async function deleteBook(id) {
    return api.del(endpoints.deleteBook + id);
}
