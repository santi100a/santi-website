import React from 'react';

export default function CheckTransaction(props: Record<string, (event: React.FormEvent) => unknown>) {
	return (
		<form id="send" onSubmit={props.handleCheckTransaction}>
			<h2>Consultar información de la transacción</h2>
			<input
				type="text"
				name="id"
				placeholder="Id. de transacción"
				required
				aria-required
			/>
			<br />
			
			<input
				id="sendBtn"
				className="button"
				type="submit"
				value="Consultar"
			/>
		</form>
	);
}
