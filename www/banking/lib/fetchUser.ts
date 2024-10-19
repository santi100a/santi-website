/// <reference path="typings.d.ts" />

const apiUrl = 'http://127.0.0.1:5000';

export async function fetchUser(username: string, password: string): Promise<SentUserResponse> {
	return fetch(`${apiUrl}/my-info`, {
		headers: {
			Authorization: `Basic ${btoa(`${encodeURIComponent(username)}:${encodeURIComponent(password)}`)}`
		}
	}).then((r) => r.json());
}
export async function createUser(username: string): Promise<CreationResponse> {
	return fetch(apiUrl + '/new-bank-account', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username })
	}).then((r) => r.json());
}
export async function deleteUser(username: string, token: string): Promise<APIResponse<null>> {
	const result = await fetch(apiUrl + '/delete-account', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${btoa(`${encodeURIComponent(username)}:${encodeURIComponent(token)}`)}`
		},
		body: JSON.stringify({ username })
	});
	if (result.status === 204) return { status: 204, error: null, result: null };
	else return result.json();
}
export async function sendMoney(
	username: string,
	password: string,
	amount: number,
	payee: string,
	purpose: string
): Promise<TransactionResponse> {
	return fetch(apiUrl + '/send-money', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${btoa(`${encodeURIComponent(username)}:${encodeURIComponent(password)}`)}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			amount: Number(amount).toFixed(2),
			payee,
			purpose
		})
	}).then((r) => r.json());
}

export async function transactionHistory(
	username: string,
	password: string
): Promise<HistoryResponse> {
	return fetch(`${apiUrl}/transaction-history`, {
		headers: {
			Authorization: `Basic ${btoa(`${encodeURIComponent(username)}:${encodeURIComponent(password)}`)}`
		}
	}).then((r) => r.json());
}
export async function transactionById(
	id: string
): Promise<TransactionResponse> {
	return fetch(`${apiUrl}/transaction-info?transaction_id=${encodeURIComponent(id)}`).then((r) => r.json());
}
