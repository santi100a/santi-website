/// <reference path="App.d.ts"/>
import { AnalogClock } from './AnalogClock';
import * as React from 'react';
import './App.css';
import { getTwelveTimeString, getHandAngle } from '../modules/time-functions';

function App() {
	const [date, setDate] = React.useState(new Date);
	const {
		hourRotation: hRotation,
		minuteRotation: mRotation,
		secondRotation: sRotation,
	} = getHandAngle({
		hours: date.getUTCHours(),
		seconds: date.getUTCSeconds(),
		minutes: date.getUTCMinutes(),
	});
    const [hourRotation, setHourRotation] = React.useState(hRotation);
    const [minuteRotation, setMinuteRotation] = React.useState(mRotation);
    const [secondRotation, setSecondRotation] = React.useState(sRotation);
    
	setInterval?.(() => setDate(new Date()), 1_000);
    setInterval?.(() => {
        const date = new Date;
        const { hourRotation, minuteRotation, secondRotation } = 
        getHandAngle({
            hours: date.getUTCHours(),
            seconds: date.getUTCSeconds(),
            minutes: date.getUTCMinutes(),
        })
        setHourRotation(hourRotation);
        setMinuteRotation(minuteRotation);
        setSecondRotation(secondRotation);
    }, 1_000);
	return (
		<>
			<h1>Reloj</h1>
			<div className="clocks-container">
				<div id="digital">{getTwelveTimeString(date)}</div>
				<AnalogClock hourRotation={hourRotation} minuteRotation={minuteRotation} secondRotation={secondRotation}  />
			</div> 
		</>
	);
}
export default App;
