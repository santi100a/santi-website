export default function spanishDate(date: Date) {
	const weekdayWords = [
		'Domingo',
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado'
	];
	const monthWords = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];

	const weekday = weekdayWords[date.getDay()]; // 0 = Sunday, 1 = Monday ... 6 = Saturday
    const monthday = String(date.getDate());
	const month = monthWords[date.getMonth()]; // 0 = January, 1 = February ... 11 = December
    const year = String(date.getFullYear());
    const militaryHours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hours = String(militaryHours % 12 || 12);
    const paddedMinutes = minutes >= 10 ? String(minutes) : '0'.concat(String(minutes));
    const paddedSeconds = seconds >= 10 ? String(seconds) : '0'.concat(String(seconds)); 
    const period = militaryHours >= 12 ? 'PM' : 'AM';

    return `${weekday}, ${monthday} de ${month} de ${year} | ${hours}:${paddedMinutes}:${paddedSeconds} ${period}`;
}
