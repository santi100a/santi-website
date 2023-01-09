/// <reference path="index.d.ts" />

import './index.scss';
import aud from './success.wav';
import { select } from 'd3';
import { randomFromArray, random } from '@santi100/random-lib';
import { 
    CANVAS_DIMENSIONS, CIRCLE_RADIUS, COLORS, 
    TRANSITION_DURATION, MIDDLE_X, MIDDLE_Y 
} from './constants';

const audio = new Audio(aud);

const isMobile = (ua: string) => /(iPhone|iPad|iPod|Android)/i.test(ua);

if (isMobile(navigator.userAgent)) {
    const canContinue = confirm('El Círculo Escurridizo no funcionará correctamente, a menos que tengas un mouse. ¿Continuar?');
    if (!canContinue) location.href = 'https://google.com';
}

let state = 0;
const setState = <T extends typeof state = typeof state>(n: T) => state = n;

let promptState = 0;
const setPromptState = 
<T extends typeof promptState = typeof promptState>(n: T) => promptState = n;

const root = select('div#root');

const prompt = root.append('p')
        .attr('class', 'prompt')
        .text(`Contador: ${state} (${state % 2 === 0 ? 'par' : 'impar'}).`);
const sneakyPrompt = root.append('p')
        .attr('class', 'prompt')
        .text(`Intentos: ${state} (${state % 2 === 0 ? 'par' : 'impar'}).`);
const svg = root.append('svg')
                .attr('height', CANVAS_DIMENSIONS.height)
                .attr('width', CANVAS_DIMENSIONS.width);

const circle = svg.append('circle')
                    .attr('cx', 35)
                    .attr('cy', 35)
                    .attr('r', CIRCLE_RADIUS)
                    .attr('fill', randomFromArray(COLORS));
const sneakyCircle = svg.append('circle')
                    .attr('class', 'sneaky')
                    .attr('cx', MIDDLE_X)
                    .attr('cy', MIDDLE_Y)
                    .attr('r', CIRCLE_RADIUS)
                    .attr('fill', randomFromArray(COLORS));

function circleClickFor(circ: import('d3').Selection<SVGCircleElement, unknown, HTMLElement, any>) {
    const args = arguments;
    return () => {
        const transition = circ.transition().duration(TRANSITION_DURATION);
        transition.attr('cx', random(500, 30))
                  .attr('cy', random(500, 30))
                  .attr('fill', randomFromArray(COLORS));

        return args;
    }
}
circle.on('click', () => {
    setState(state + 1);
    circleClickFor(circle)();
    prompt.text(`Contador: ${state} (${state % 2 === 0 ? 'par' : 'impar'}).`);
});
sneakyCircle.on('mouseover', () => {
    setPromptState(promptState + 1);
    circleClickFor(sneakyCircle)();
    sneakyPrompt.text(`Intentos: ${promptState} (${promptState % 2 === 0 ? 'par' : 'impar'}).`);
    if (promptState >= 100) sneakyPrompt.style('font-weight', 'bold');

    if (promptState >= 1000) 
    root.text('Gracias a Freesound.org por el sonido al hacer clic en el Círculo Escurridizo.');
});
sneakyCircle.on('click', () => {
    audio.play();
    alert('¡Hiciste clic en el Círculo Escurridizo!');
    setPromptState(0);
    sneakyPrompt.text(`Intentos: ${promptState} (${promptState % 2 === 0 ? 'par' : 'impar'}).`);
});