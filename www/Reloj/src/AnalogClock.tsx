import * as React from 'react';
import backgroundImage from './clock.jpg';
export function AnalogClock({ hourRotation, minuteRotation, secondRotation }: Record<string, number>) {
	return (
		<div
			id="analog"
			style={{
				backgroundImage,
			}}>
			<div
				id="hour"
				style={{
					transform: `rotate(${hourRotation}deg)`,
				}}></div>
			<div
				id="minute"
				style={{
					transform: `rotate(${minuteRotation}deg)`,
				}}></div>
			<div
				id="second"
				style={{
					transform: `rotate(${secondRotation}deg)`,
				}}></div>
		</div>
	);
}
