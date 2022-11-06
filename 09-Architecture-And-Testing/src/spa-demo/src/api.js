const host = 'http://localhost:3030';

const getUserData = () => JSON.parse(sessionStorage.getItem('userData'));

const setUserData = (userData) => sessionStorage.setItem('userData', JSON.stringify(userData));

const clearUserData = () => sessionStorage.removeItem('userData');

async function request(method,url, data) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const options = {
        method: method,
        headers:{},
    };

    if (data !== undefined){
        options.headers = {'Content-Type': 'application/json'}
        options.body = JSON.stringify(data)
    }

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    const response = await fetch(host + url, options);

    if (response.status === 204){
        return response;
    }

    if (response.status === 403){
        clearUserData();
    }

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message);
    }

    return responseData;
}

const get = request.bind(null,'get');
const post = request.bind(null,'POST');
const put = request.bind(null,'PUT');
const del = request.bind(null,'DELETE');

export {get, post, put, del, clearUserData, getUserData, setUserData}
