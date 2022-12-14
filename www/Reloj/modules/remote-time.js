/// <reference path="./remote-time.d.ts" />

const API_URL = new URL('https://santi-apis.onrender.com/time');

export async function retrieveTime(url = API_URL) {
    return fetch(url)
        .then(response => [response.json(), null])
        .catch(error => [null, error]);
}