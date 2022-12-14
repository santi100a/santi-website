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

declare function getTwelveTimeString(dateObj: Date): string;
declare function getHandAngle({ hours, minutes, seconds }: TimeObject): AngleObject;

export { getTwelveTimeString, getHandAngle };