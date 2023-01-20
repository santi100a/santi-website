window.speechSynthesis?.addEventListener('voiceschanged', () => {
    console.log('Voces cambiadas.');
    const prompt = document.querySelector('p');
    prompt.style.display = 'block';
});

export default null;