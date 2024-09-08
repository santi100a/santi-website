import React from 'react';
import ColoredBalance from './ColoredBalance';
import ErrorString from './ErrorString';
import spanishDate from '../lib/spanishDate';


export default function TransactionInfo({
	transactionObject
}: {
	transactionObject: Transaction;
}) {
	return (
		<>
			<strong>Fecha y hora de la transacción:</strong> {spanishDate(new Date(transactionObject.datetime))} <br />
			<strong>Id. de transacción:</strong> {transactionObject.id} <br />
			<strong>Monto:</strong>{' '}
			<ColoredBalance balance={Number(transactionObject.amount)} /> <br />
			<strong>Beneficiario:</strong> {transactionObject.payee} <br />
			<strong>Por concepto de:</strong>{' '}
			{String(transactionObject.purpose).trim() ? (
				<>{String(transactionObject.purpose)}</>
			) : (
				<em>(Sin concepto)</em>
			)}
			<br />
			<strong>Estado de la transacción:</strong>{' '}
			{transactionObject.status === 'approved' ? (
				<span style={{ color: 'green' }}>Aprobada</span>
			) : (
				<span style={{ color: 'red' }}>Rechazada</span>
			)}
			<br />
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