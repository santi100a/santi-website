import React from 'react';
import ColoredBalance from './ColoredBalance';
import ErrorString from './ErrorString';
import spanishDate from '../lib/spanishDate';


export default function TransactionInfo({
	transactionObject
}: {
	readonly transactionObject: Transaction;
}) {
	return (
		<>
			{transactionObject.payer} &rarr; {transactionObject.payee} {transactionObject.status === 'approved' ? (
				<span style={{ marginLeft: '2pc', padding: '0.5pc 0.2pc', color: '#ffffff', border: '#00ff00', background: '#006600' }}>Aprobada</span>
			) : (
				<span style={{ marginLeft: '2pc', padding: '0.5pc 0.2pc', color: '#ffffff', border: '#ff0000', background: '#660000' }}>Rechazada</span>
			)} <br />
			
			<strong>Monto:</strong>{' '}
			<ColoredBalance balance={Number(transactionObject.amount)} /> <br />
			<strong>Por concepto de:</strong>{' '}
			{String(transactionObject.purpose).trim() ? (
				<>{String(transactionObject.purpose)}</>
			) : (
				<em>(Sin concepto)</em>
			)}
			<br />
			<strong>Fecha y hora de la transacción:</strong> {spanishDate(new Date(transactionObject.datetime))} <br />
			<strong>Id. de transacción:</strong> <code>{transactionObject.id}</code> &nbsp;
			<button onClick={
				() => navigator.clipboard.writeText(transactionObject.id)
			}>Copiar</button><br />
			{transactionObject.error ? (
				<ErrorString
					code={transactionObject.error.code}
					description={transactionObject.error.description}
					status={''}
				/>
			) : (
				<></>
			)}
			<br />
		</>
	);
}