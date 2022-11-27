const btn = document.querySelector('.button'),
result = document.querySelector('#result');
let r;
function get() {
    let sum = parseFloat(document.getElementById('first')?.value.trim?.() || 0);
    a = Math.sqrt(sum);
    if (isNaN(a)) a = '?';
    if (a === Infinity) a = '∞ (infinito)';
    result.innerHTML = 'La raíz es: '.concat(a);
}
btn.onclick = get;
document.forms[0].onsubmit = event => event.preventDefault() && get();