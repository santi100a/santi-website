/// <reference path="../lib/typings.d.ts" />
import React from 'react';
import messages from '../lib/messages';
import financialFormat from '../lib/financialFormat';
import ColoredBalance from './ColoredBalance';
import TransactionInfo from './TransactionInfo';

const errorString = (code, description, status = '') => (
	<span style={{ color: 'red' }}>
		{messages[code] ?? <em>(Error no especificado)</em>}
		<br />
		<strong>Información técnica del error:</strong>{' '}
		<code>
			Error {status} [{code}]: {description}
		</code>
	</span>
);

export default function TransactionHistory({
	transactionHistory,
	username
}: {
	transactionHistory: TransactionResponse[];
	status: string | number;
	username: string;
}) {
	return (
		<div id="history">
			{transactionHistory && transactionHistory.length > 0 ? (
				<details>
					<summary>Historial de transacciones</summary>

					{transactionHistory.map((transaction) => {
						return (
							<TransactionInfo
								transactionObject={
									username === transaction.result.payee
										? transaction.result
										: {
												...transaction.result,
												amount: -transaction.result.amount
										  }
								}
							/>
						);
					})}
				</details>
			) : (
				<p>No hay transacciones disponibles.</p>
			)}
		</div>
	);
}
