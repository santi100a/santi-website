const btn = document.querySelector('.button'),
result = document.querySelector('#result');
let r;
function get() {
    let sum = [], a = 0;
    sum[0] = parseFloat(document.getElementById('first')?.value.trim?.() || 0),
    sum[1] = parseFloat(document.getElementById('second')?.value.trim?.() || 0);
    a = sum[0] - sum[1];
    if (isNaN(a)) a = '?';
    if (a === Infinity) a = '∞ (infinito)';
    result.innerHTML = 'La diferencia es: '.concat(a);
}
btn.onclick = get;
document.forms[0].onsubmit = event => event.preventDefault() && get();