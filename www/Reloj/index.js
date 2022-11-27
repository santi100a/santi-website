const 
	reloj = document.querySelector('#digital'),
	hr = document.querySelector('#hour'),
	mn = document.querySelector('#minute'),
	sg = document.querySelector('#second');

async function hora() {
	const fecha = new Date;
	let horas = fecha.getHours();
	let minutos = fecha.getMinutes();
	let segundos = fecha.getSeconds();
	let amPm = horas < 12 ? 'AM' : 'PM';
	if (horas > 12)
		horas = horas - 12;
	if (horas < 10) 	
		horas = `0${horas}`;
	if (minutos < 10) 
		minutos = `0${minutos}`;
	if (segundos < 10) 
		segundos = `0${segundos}`;
	reloj.innerHTML = `${horas}:${minutos}:${segundos} ${amPm}`;
	let hr_rotation = 30 * horas + minutos / 2; 
	let min_rotation = 6 * minutos;
	let sec_rotation = 6 * segundos;
	
	hr.style.transform = `rotate(${hr_rotation}deg)`;
	mn.style.transform = `rotate(${min_rotation}deg)`;
	sg.style.transform = `rotate(${sec_rotation}deg)`;
}

setInterval(hora, 1);