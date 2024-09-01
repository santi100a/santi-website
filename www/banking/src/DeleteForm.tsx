import React from 'react';

export default function DeleteForm(
	props: Record<string, (event: React.FormEvent) => unknown>
) {
	return (
		<form id="delete" onSubmit={props.handleDeleteUser}>
			<h2>Eliminar cuenta</h2>
			<input
				type="text"
				id="username"
				placeholder="Nombre de usuario"
				required
				aria-required
			/>
			<br />
			<input
				type="password"
				id="password"
				placeholder="Token"
				required
				aria-required
			/>
			<br />
			<input
				id="deleteBtn"
				className="button danger"
				type="submit"
				value="Borrar cuenta"
			/>
		</form>
	);
}
