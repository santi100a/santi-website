import React from 'react';

export default function LoginForm(
	props: Record<string, (...params: unknown[]) => unknown>
) {
	const usernameRef = React.useRef<HTMLInputElement>();
	const passwordRef = React.useRef<HTMLInputElement>();

	return (
		<form id="login" onSubmit={props.handleLogin}>
			<h2>Iniciar sesión para ver saldo</h2>
			<input
				ref={usernameRef}
				type="text"
				name="username" // Add name attribute
				placeholder="N° de cuenta (18 dígitos, sin guiones)"
				maxLength={18}
				required
				aria-required
				autoComplete="username" // Set autocomplete to 'username'
			/>
			<br />
			<input
				ref={passwordRef}
				type="password"
				name="password" // Add name attribute
				placeholder="Token"
				required
				aria-required
				autoComplete="current-password" // Set autocomplete to 'current-password'
			/>
			<br />
			<input
				id="loginBtn"
				type="submit"
				className="button"
				value="Iniciar sesión"
			/>
			<button
				id="transactionBtn"
				onClick={
					props.handleTransactionHistory(
						usernameRef,
						passwordRef
					) as React.MouseEventHandler<HTMLButtonElement>
				}>
				Ver historial de transacciones
			</button>
		</form>
	);
}
