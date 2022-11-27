const btn = document.querySelector('.button'),
result = document.querySelector('#result');
function get() {
    let sum = [], a = 0;
    sum.push(parseFloat(document.getElementById('first')?.value.trim?.() || 0),
    parseFloat(document.getElementById('second')?.value.trim?.() || 0));
    const [ first, second ] = sum;
    a = first + second;
    if (isNaN(a)) a = '?';
    if (a === Infinity) a = '∞ (infinito)';
    result.innerHTML = 'La suma es: '.concat(a);
}
btn.onclick = get;
document.forms[0].onsubmit = event => event.preventDefault() && get();