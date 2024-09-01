interface Transaction {
	amount: number | string;
    error?: SystemErrorObject;
	id: string;
	payer: string;
	payee: string;
	purpose: string;
	status: 'approved' | 'declined';
}
interface SystemResponse {
	status: number;
	transaction: Transaction;
}
interface SystemErrorObject {
    code: string;
    description: string;
}
interface TransactionResponse {
    error?: SystemErrorObject | null;
    result: Transaction;
}