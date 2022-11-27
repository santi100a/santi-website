declare module 'random';
/** 
 * Returns a pseudo-random integer between min and max.
 * @param {number} max The maximum value.
 * @param {number} min The minimum value (0 by default).
 * @returns {number} A pseudo-random integer between min and max.
 */
declare function random(max: number, min?: number): number;
/**
 * Returns a pseudo-random floating-point number 
 * between min and max.
 * @param max The maximum value. 
 * @param min The minimum value (0.0 by default).
 * @returns A pseudo-random floating-point number 
 * between min and max.
 */
declare function randomFloat(max: number, min?: number): number;
export default random;
export { random, randomFloat };