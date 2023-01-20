import React from 'react';
import './index.scss';
import WarningButton from './WarningButton';

navigator?.serviceWorker?.register('./sw.js')
    .then(() => console.log('Successfully registered service worker.'))
    .catch(() => console.error('Failed to register service worker.'))

function speak(text: string, rate?: number, pitch?: number) {
    
    if ('SpeechSynthesisUtterance' in window && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = rate || 1;
        utterance.pitch = pitch || 1;
        speechSynthesis.speak(utterance);
    }
}
function App() {
    if (!('speechSynthesis' in window) && !('SpeechSynthesisUtterance' in window)) {
        alert('Este navegador no admite la API de síntesis de voz.');
        (globalThis || window || this).history?.go(-1);
    }

    const handleSubmit = React.useCallback(
        function (event: React.FormEvent) {
            event.preventDefault();
            const { value: text } = inputRef.current;
            const { value: speed } = speedRef.current;
            const { value: pitch } = pitchRef.current;

            speak(text, Number(speed), Number(pitch));
        }, 
    [])
    const inputRef = React.useRef<HTMLTextAreaElement>();
    const speedRef = React.useRef<HTMLInputElement>();
    const pitchRef = React.useRef<HTMLSelectElement>();
    const buttonRef = React.useRef<HTMLInputElement>();
    let count = 0;
    const hwButton = React.useCallback(() => {
        const el = document.querySelector('button');
        count++;
        el.innerText = count % 2 === 0 ? 'Pausar' : 'Reanudar';
        el.classList.toggle('warning');

        if (count % 2 === 0) {
            if (window.speechSynthesis?.paused)
                window.speechSynthesis?.resume();
        } else {
            window.speechSynthesis?.pause();
        }
    }, []);
    
    return (
        <>
            <h1>Texto a voz</h1>
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Escribe algo..." ref={inputRef}></textarea><br />
                <label htmlFor="speed">Velocidad: </label>
                <input type="number" 
                ref={speedRef} 
                defaultValue={1} 
                min={-1} 
                id="speed" /><br />
                <label htmlFor="pitch">Tono: </label>
                <select defaultValue={1} ref={pitchRef} id="pitch">
                    <option value="0">Grave</option>
                    <option value="1">Medio</option>
                    <option value="2">Agudo</option>
                </select><br />
                <input name="submit" type="submit" ref={buttonRef} />
                <WarningButton onClick={hwButton}>
                    Pausar
                </WarningButton>
            </form>
            <p>Voces listas.</p>
        </>
    );
}


export default App;