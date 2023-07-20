interface TimeObject {
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;
}
interface AngleObject {
    readonly hourRotation: number;
    readonly minuteRotation: number;
    readonly secondRotation: number;
}
function getTwelveTimeString(dateObj: Date): string {
    let hours: string | number = dateObj.getHours();
    let minutes: string | number = dateObj.getMinutes();
    let seconds: string | number = dateObj.getSeconds();
	let amPm = hours < 12 ? 'AM' : 'PM';
    hours = hours > 12 ? hours - 12 : hours; 
	if (hours < 10) hours = `0${hours}`;
	if (minutes < 10) minutes = `0${minutes}`;
	if (seconds < 10) seconds = `0${seconds}`;
	return `${hours}:${minutes}:${seconds} ${amPm}`;
}
function getHandAngle({ hours, minutes, seconds }: TimeObject): AngleObject {
    const hourRotation = 30 * hours + minutes / 2; 
	const minuteRotation = 6 * minutes;
	const secondRotation = 6 * seconds;
    return { hourRotation, minuteRotation, secondRotation };
}

export { getTwelveTimeString, getHandAngle };