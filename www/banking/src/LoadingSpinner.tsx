import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
	return (
		<div className="loading-container">
			<div className="loader"></div>
			<span>Cargando...</span>
		</div>
	);
}
