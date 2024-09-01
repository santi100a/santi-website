import React from 'react';
import messages from '../lib/messages';

export default function errorString({ code, description, status = '' }: any) {
	return (
		<span style={{ color: 'red' }}>
			{messages[code] ?? <em>(Error no especificado)</em>}
			<br />
			<strong>Información técnica del error:</strong>{' '}
			<code>
				Error {status} [{code}]: {description}
			</code>
		</span>
	);
}
