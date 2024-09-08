type TransactionStatus = 'approved' | 'pending' | 'declined';
interface Transaction {
	readonly datetime: number;
	readonly amount: number;
	status: TransactionStatus;
	error: APIError | null;
	readonly id: string;
	readonly payer: string;
	readonly payee: string;
	readonly purpose: string;
}
interface User {
	readonly username: string;
	transaction_ids: string[];
	readonly key: string;
}
interface SentUser extends User { readonly balance: number; }
interface APIError {
	readonly code: string;
	readonly description: string;
}
interface APIResponse<T = Record<string, any>> {
	readonly status: number;
	readonly error: APIError | null;
	readonly result: T | null;
}
type TransactionResponse = APIResponse<Transaction>;
type HistoryResponse = APIResponse<Transaction[]>;
type CreationResponse = APIResponse<{ token: string }>;
type UserResponse = APIResponse<User>;
type SentUserResponse = APIResponse<SentUser>;
