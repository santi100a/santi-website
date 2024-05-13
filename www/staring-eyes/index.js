function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;
    return deg;
}
const eyes = document.querySelectorAll('.eye');
const anchor = document.querySelector('img#anchor');
const rect = anchor.getBoundingClientRect();
const [ anchorX, anchorY ] = [
    rect.left + rect.width / 2,
    rect.top + rect.height / 2
];
document.addEventListener('mousemove', e => {
    const { clientX: mouseX, clientY: mouseY } = e;
    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    eyes.forEach(eye => {
        eye.style.transform = `rotate(${90 + angleDeg}deg)`;
        anchor.style.filter = `hue-rotate(${angleDeg}deg)`;
    })
});