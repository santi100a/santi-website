import { retrieveTime } from "./modules/remote-time.js";
import { getTwelveTimeString, getHandAngle } from "./modules/time-functions.js";

const 
	reloj = document.querySelector('#digital'),
	hr = document.querySelector('#hour'),
	mn = document.querySelector('#minute'),
	sg = document.querySelector('#second');

function updateUI(date, {
	clock, hr, mn, sg
}) {
	const { hourRotation, minuteRotation, secondRotation } = getHandAngle({
		hours: date.getUTCHours(),
		seconds: date.getUTCSeconds(),
		minutes: date.getUTCMinutes(),
	});
	clock.innerHTML = getTwelveTimeString(date);
	hr.style.transform = `rotate(${hourRotation}deg)`;
	mn.style.transform = `rotate(${minuteRotation}deg)`;
	sg.style.transform = `rotate(${secondRotation}deg)`;
}

async function hora() {
	const [ tiempo, error ] = await retrieveTime(new URL('https://santi-apis.onrender.com/time'));
	if (error) console.error('Falló la solicitud para actualizar el tiempo. Se usará el tiempo local.')
	const fecha = new Date(tiempo?.timestamp || undefined);
	updateUI(fecha, {
		clock: reloj,
		hr, mn, sg
	})
	
	setInterval(() => {
		fecha.setTime(fecha.getTime() + 1000)
		updateUI(fecha, {
			clock: reloj,
			hr, mn, sg
		})
	}, 1000)
}
 
await hora();