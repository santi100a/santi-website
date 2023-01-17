import React from 'react';
import './index.scss';

function speak(text: string, rate?: number, pitch?: number) {
    
    if ('SpeechSynthesisUtterance' in window && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = rate || 1;
        utterance.pitch = pitch || 1;
        speechSynthesis.speak(utterance);
    }
}
function App() {
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
                    <option value="-1">Grave</option>
                    <option value="1">Medio</option>
                    <option value="2">Agudo</option>
                </select><br />
                <input type="submit" />
            </form>
        </>
    );
}

export default App;