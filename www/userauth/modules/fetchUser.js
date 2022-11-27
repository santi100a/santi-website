const apiUrl = 'https://santi-apis.onrender.com';

async function fetchUser(username, password) {
    return fetch(apiUrl + '/users/login', {
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        }
    }).then(r => r.json()); 
}
async function createUser(username, password, data = {}) {
    return fetch(apiUrl + '/users/signup', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        },
        body: JSON.stringify(data)
    }).then(r => r.json()); 
}
async function updateUser(username, password, data) {
    return fetch(apiUrl + '/users/update', {
        method: 'PATCH',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(r => r.json()); 
}
async function deleteUser(username, password) {
    return fetch(apiUrl + '/users/delete', {
        method: 'DELETE',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)

        }
    }).then(r => r.json()); 
}

export { fetchUser, createUser, updateUser, deleteUser };