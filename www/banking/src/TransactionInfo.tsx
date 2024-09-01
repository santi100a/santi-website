import React from 'react';
import ColoredBalance from './ColoredBalance';
import ErrorString from './ErrorString';

export default function TransactionInfo({
  transactionObject
}: {
  transactionObject: Transaction;
}) {
  return (
    <table border={3}>
      <thead>
        <tr>
          <th>Id.</th>
          <th>Monto</th>
          <th>Beneficiario</th>
          <th>Concepto</th>
          <th>Estado</th>
          {transactionObject.error && <th>Error</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{transactionObject.id}</td>
          <td><ColoredBalance balance={Number(transactionObject.amount)} /></td>
          <td>{transactionObject.payee}</td>
          <td>
            {String(transactionObject.purpose).trim() ? (
              <>{String(transactionObject.purpose)}</>
            ) : (
              <em>(Sin concepto)</em>
            )}
          </td>
          <td>
            {transactionObject.status === 'approved' ? (
              <span style={{ color: 'green' }}>Aprobada</span>
            ) : (
              <span style={{ color: 'red' }}>Rechazada</span>
            )}
          </td>
          {transactionObject.error && (
            <td>
              <ErrorString
                code={transactionObject.error.code}
                description={transactionObject.error.description}
                status={''}
              />
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
}

/*
|  Id. | Monto | Beneficiario | Concepto | Estado | (Error, si no hay error omitir) |
|------|-------|--------------|----------|--------|---------------------------------|
|23a-4f|SED0.12|63768736485873|Pago algo |Rechazado|(Error)|

*/