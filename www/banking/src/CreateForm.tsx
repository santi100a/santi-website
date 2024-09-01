import React from 'react';

export default function CreateForm(props: { handleSignup: (e: React.FormEvent) => Promise<void> }) {
	return (
		<form id="signup" onSubmit={props.handleSignup}>
			<h2>¡Únete al Banco!</h2>
			<input
				type="text"
				name="username"
				placeholder="Nombre de usuario"
				required
				aria-required
			/>
			<br />
			<input
				id="signupBtn"
				className="button success"
				type="submit"
				value="Crear cuenta"
			/>
		</form>
	);
}
