import React from 'react';
import './index.css';
import WarningButton from './WarningButton';


function speak(text: string, rate?: number, pitch?: number) {
    
    if ('SpeechSynthesisUtterance' in window && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = rate || 1;
        utterance.pitch = pitch || 1;
        document.body.click();
        speechSynthesis.speak(utterance);
    }
}
function App(this: Window & typeof globalThis) {
    if (!('speechSynthesis' in window) && !('SpeechSynthesisUtterance' in window)) {
        alert('Este navegador no admite la API de síntesis de voz.');
        (globalThis || window || this).history?.go(-1);
    }

    const handleSubmit = React.useCallback(
        function (event: React.FormEvent) {
            event.preventDefault();
            const { value: text  } = inputRef!.current!;
            const { value: speed } = speedRef!.current!;
            const { value: pitch } = pitchRef!.current!;

            speak(text, Number(speed), Number(pitch));
        }, 
    [])
    const inputRef  = React.useRef<HTMLTextAreaElement>() as React.RefObject<HTMLTextAreaElement>;
    const speedRef  = React.useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
    const pitchRef  = React.useRef<HTMLSelectElement>() as React.RefObject<HTMLSelectElement>;
    const buttonRef = React.useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;
    let count = 0;
    const hwButton = React.useCallback(() => {
        const el = document.querySelector('button')!;
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

    document?.body?.click?.();
    speak('');
    
    return (
        <>
            <h1>Texto a voz</h1>
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Escribe algo..." ref={inputRef}></textarea><br />
                <label htmlFor="speed">Velocidad: </label>
                <input type="number" 
                ref={speedRef} 
                defaultValue={1} 
                id="speed" /><br />
                <label htmlFor="pitch">Tono: </label>
                <select defaultValue={1} ref={pitchRef} id="pitch">
                    <option value="0.5">Grave</option>
                    <option value="1">Medio</option>
                    <option value="2">Agudo</option>
                </select><br />
                <input name="submit" type="submit" ref={buttonRef} />
                <WarningButton onClick={hwButton}>
                    Pausar
                </WarningButton>
            </form>
        </>
    );
}


export default App;