import './index.css';
import { select } from 'd3';
import { random, randomFromArray } from '@santi100/random-lib';

const root = select('div#root');
const CIRCLE_RADIUS = 30;
const TRANSITION_DURATION = 300;

const [ CANVAS_HEIGHT, CANVAS_WIDTH ] = [500, 500];
const colors = [
    'red', 'orange', 'yellow', 
    '#0f0','blue', 'purple'
];
const prompt = root.append('p')
                    .text('Contador: 0.')
const svg = root.append('svg')
                .attr('height', CANVAS_HEIGHT)
                .attr('width', CANVAS_WIDTH);
const circle = svg.append('circle')
                  .attr('cx', 35)
                  .attr('cy', 35)
                  .attr('r', CIRCLE_RADIUS)
                  .attr('fill', randomFromArray(colors));
const sneakyCircle = svg.append('circle')
                  .attr('cx', CANVAS_HEIGHT / 2)
                  .attr('cy', CANVAS_WIDTH / 2)
                  .attr('r', CIRCLE_RADIUS)
                  .attr('fill', randomFromArray(colors));
let count = 0;
circle.on('click', () => {
    count++;
    prompt.text(`Contador: ${count}.`);
    circle.transition()
          .duration(TRANSITION_DURATION)
          .attr('cx', random(500, 30))
          .attr('cy', random(500, 30))
          .attr('fill', randomFromArray(colors));
});
sneakyCircle.on('mouseover', () => {
    sneakyCircle.transition()
          .duration(TRANSITION_DURATION)
          .attr('cx', random(500, 30))
          .attr('cy', random(500, 30))
          .attr('fill', randomFromArray(colors));
});
sneakyCircle.on('click', () => {
    alert('¡Lograste hacer clic en el Círculo Escurridizo!');
});