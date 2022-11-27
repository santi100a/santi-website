// @ts-check
function random(max, min = 0) {
    if (!max) 
        throw new Error('Missing argument \'max\'. ');
    else if (typeof max !== 'number')
        throw new TypeError(
            'Argument \'max\' must be a number. '
        );
        else if (max.toString().includes('.'))
            throw new TypeError(
                'Argument \'max\' must be an integer. '
            );
        else if (!min)
            return Math.floor(Math.random() * max);
        else if (typeof min !== 'number')
            throw new TypeError(
                'Argument \'min\' must be a number. '
            );
        else if (min.toString().includes('.'))
            throw new TypeError(
                'Argument \'min\' must be an integer. '
            );
        else if (min > max)
            throw new RangeError(
                'Argument \'min\' must be less than argument \'max\'. '
            );
        else
            return Math.floor(Math.random() * (max - min + 1)) + min;
    
}
function randomFloat(max, min = 0.0) {
    if (!max) 
        throw new Error('Missing argument \'max\'. ');
    else if (typeof max !== 'number')
        throw new TypeError(
            'Argument \'max\' must be a number. '
        );
        else if (!min)
            return Math.random() * max;
        else if (typeof min !== 'number')
            throw new TypeError(
                'Argument \'min\' must be a number. '
            );
        else if (min > max)
            throw new RangeError(
                'Argument \'min\' must be less than argument \'max\'. '
            );
        else
            return (Math.random() * (max - min + 1.0)) + min;
}
export default random;
export { random, randomFloat };