import * as api from "./api.js";

const endpoints = {
    byCarId: carId => '/data/comments?where=' + encodeURIComponent(`carId="${carId}"`),
}

export  async function getCommentsByCarId(carId) {
    return api.get(endpoints.byCarId(carId));
}
