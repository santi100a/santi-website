import React from 'react';

export default function SendForm(props: Record<string, (event: React.FormEvent) => unknown>) {
	return (
		<form id="send" onSubmit={props.handleSendMoney}>
			<h2>Enviar fondos</h2>
			<input
				type="text"
				name="username"
				placeholder="N° de cuenta del pagador (18 dígitos, sin guiones)"
				maxLength={18}
				required
				aria-required
			/>
			<br />
			<input
				type="password"
				name="password"
				placeholder="Token"
				required
				aria-required
			/>
			<br />
			<input
				type="text"
				id="payee"
				placeholder="N° de cuenta del beneficiario (18 dígitos, sin guiones)"
				maxLength={18}
				required
				aria-required
			/>
			<br />
			<input
				type="number"
				id="amount"
				placeholder="Monto a enviar"
				min="0.01"
				step="0.01"
				required
				aria-required
			/>
			<br />
			<input type="text" id="purpose" placeholder="Concepto (opcional)" />
			<br />
			<input
				id="sendBtn"
				className="button warning"
				type="submit"
				value="Enviar fondos"
			/>
		</form>
	);
}
