const form = document.forms[0];
const input = document.querySelector('input#speech');
const SYNTH = window.speechSynthesis; 

form.onsubmit = ev => {
    ev.preventDefault();
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
        const utterance = new SpeechSynthesisUtterance(input.value);
        SYNTH.speak(utterance);
    } else {
        alert('Este navegador no admite la API de síntesis de voz.')
    }
}