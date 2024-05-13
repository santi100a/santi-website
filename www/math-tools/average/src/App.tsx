import './App.css';
import average from '@santi100/average-lib';
import { createRef, useCallback, useRef } from 'react';

const inputRef = createRef<HTMLInputElement>();
const resultsRef = createRef<HTMLParagraphElement>();


export default function App() {
    const callback = useCallback(() => {
        const str = String(inputRef.current?.value);
    
        const numberStrings = str.split(' ');
        const numbers: number[] = [];
        for (const string of numberStrings) {
            numbers.push(Number(string));
        }
        const avg = average(numbers);
        if (resultsRef.current !== null)
            resultsRef.current.innerText = `El promedio de (${numbers.join(', ')}) es: ${avg.toFixed(7)}`;
        
    }, [inputRef.current?.value]);
    return (
        <>
            <h1>Promedio (precisión de 7 cifras)</h1>
            <p>Digita los números de los cuales quieres el promedio separados por espacios.</p>
            <input type="text" ref={inputRef} placeholder="Ingresa números separados por espacios..." />
            <br />
            <button onClick={callback}>Enviar</button>
            <p ref={resultsRef}></p>
        </>
    );
}