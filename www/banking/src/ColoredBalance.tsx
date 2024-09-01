import React from 'react';
import finfmt from '../lib/financialFormat';

export default function ColoredBalance(props: { balance: number }) {
	const formattedNumber = finfmt(props.balance);
	if (formattedNumber.startsWith('-'))
		return <span style={{ color: 'red' }}>{formattedNumber}</span>;
	
    return <span style={{ color: 'blue' }}>{formattedNumber}</span>;
    
}
