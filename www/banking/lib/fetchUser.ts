/// <reference path="typings.d.ts" />

const apiUrl = 'https://santi-apis.onrender.com';

async function fetchUser(username: string, password: string) {
	return fetch(`${apiUrl}/my-info`, {
		headers: {
			Authorization: `Basic ${btoa(`${username}:${password}`)}`
		}
	}).then((r) => r.json());
}
async function createUser(username: string) {
	return fetch(apiUrl + '/new-bank-account', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: `{"username":"${username}"}`
	}).then((r) => r.json());
}
async function deleteUser(username: string, token: string) {
	const result = await fetch(apiUrl + '/delete-account', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${btoa(`${username}:${token}`)}`
		},
		body: `{"username":"${username}"}`
	});
	if (result.status === 204) return { status: 204, error: null };
	else return result.json();
}
async function sendMoney(
	username: string,
	password: string,
	amount: number,
	payee: string,
	purpose: string
): Promise<SystemResponse> {
	return fetch(apiUrl + '/send-money', {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(`${username}:${password}`),
			'Content-Type': 'application/json'
		},
		body: `{"amount":${Number(amount).toFixed(
			2
		)},"payee":"${payee}","purpose":"${purpose}"}`
	}).then((r) => r.json());
}
export { fetchUser, createUser, sendMoney, deleteUser };
