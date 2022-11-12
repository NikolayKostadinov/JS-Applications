import * as api from './api.js';

const endpoints = {
    allRecipes: '/data/recipes',
    recipeById: '/data/recipes/',
    createFurniture: '/data/catalog',
    furnitureCatalog: '/data/catalog',
    furnitureDetails: '/data/catalog/',
    updateFurniture: '/data/catalog/',
    deleteFurniture: '/data/catalog/',
    myFurniture: '/data/catalog'

}

export async function getFurnitureCatalog() {
    return api.get(endpoints.furnitureCatalog);

}export async function getUsersFurniture(userId) {
    return api.get(endpoints.myFurniture + `?where=_ownerId%3D%22${userId}%22`);
}

export async function getFurnitureDetails(id) {
    return api.get(endpoints.furnitureDetails + id);
}

export async function deleteFurniture(id){
    return api.del(endpoints.deleteFurniture + id);
}

export async function createFurniture(furniture){
    return api.post(endpoints.createFurniture, furniture);
}

export async function editFurniture(id, furniture){
    return api.put(endpoints.updateFurniture + id, furniture);
}

export function validate(furniture) {
    const result = {}
    result.make = furniture.make.length >= 4;
    result.model = furniture.model.length >= 4;
    result.year = (1950 <= furniture.year && furniture.year <= 2050);
    result.description = furniture.description.length >= 10;
    result.price = furniture.price > 0;
    result.img = furniture.img !== '';
    result.isValid = Object.values(result).every(v => v);
    return result;
}

export const validResult = {make: true, model : true, year:true, description:true, price:true, img:true, isValid:true};
