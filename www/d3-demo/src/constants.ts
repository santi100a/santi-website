export const CIRCLE_RADIUS = 30;
export const CANVAS_DIMENSIONS: TwoDimensions
 = {
    height: 500,
    width: 500
};
export const TRANSITION_DURATION = 300;
export type CSSUnit = 'px' | 'pt' | 'pc' | 'in' | 'cm' | 'mm' | 'em' | 'ex' | 'ch' | 'rem' | 'vw' | 'vh' | 'vmin' | 'vmax' | '%';
export type Dimension = number | `${number}${CSSUnit}`
export interface TwoDimensions {
    readonly height: Dimension;
    readonly width:  Dimension;
}
export interface ThreeDimensions extends TwoDimensions {
    readonly depth: Dimension;
}
export const MIDDLE_X = Number(CANVAS_DIMENSIONS.width) / 2;
export const MIDDLE_Y = Number(CANVAS_DIMENSIONS.height) / 2;
export const COLORS = [
    '#f00', '#0f0', '#00f', // Red, Green, Blue
    '#0ff', '#f0f', '#ff0', // Cyan, Magenta, Yellow
    '#f80', '#808'          // Orange, Purple
];