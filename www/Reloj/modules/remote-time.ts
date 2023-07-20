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

const API_URL = new URL('https://santi-apis.onrender.com/time');

export async function retrieveTime(url: URL = API_URL): Promise<[TimeObject, null] | [null, Error]>  {
    try {
        const result: TimeObject = await fetch(url)
            .then(d => d.json());
        return [result, null];
    } catch (err) {
        return [null, err];
    }
}