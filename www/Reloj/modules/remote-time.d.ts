declare const API_URL: URL;

interface TimeObject {
    timestamp: number;
    isoformat: string;
    utc: string;
    norm: Norm;
}
  
interface Norm {
    yr: number;
    mo: number;
    weekd: number;
    d: number;
    h: number;
    m: number;
    s: number;
    ms: number;
}
export function retrieveTime(url?: URL): Promise<[TimeObject, null] | [null, Error]> 