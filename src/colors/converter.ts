import type { RGB, colorState } from '../types';
import { max, min, round } from '../utils/math';

/**
 * Converts a decimal number to hexadecimal.
 *
 * @param number - A decimal number.
 */
const toHex = (number: number) => {
    return (number < 16 ? '0' : '') + number.toString(16);
};

/**
 * Converts RGB color to hex.
 *
 * returns an array of two values, the hex string without the alpha channel,
 * and the alpha channel (in hexadecimal).
 *
 * The hex without alpha (opaque) is used to color the background of the alpha slider.
 *
 * @param {object} param0 - RGB color object.
 */
export const RGBToHEX = ({ r, g, b, a }: colorState): [hex: string, alpha: string] => {
    return ['#' + toHex(r) + toHex(g) + toHex(b), a < 1 ? toHex(round(a * 255)) : ''];
};

/**
 * Helper function used for converting HSL to RGB.
 *
 * @param k - Positive coefficient.
 * @param s - HSL saturation.
 * @param l - HSL lightness.
 * @returns - RGB component.
 */
const fn = (k: number, s: number, l: number): number => {
    k %= 12;
    return round((l - s * min(l, 1 - l) * max(-1, min(k - 3, 9 - k, 1))) * 255);
};

/**
 * Converts HSL to RGB.
 *
 * @param param0 - HSL color object.
 * @returns - RGB color object.
 */
export const HSLToRGB = ({ h, S, L }: colorState): RGB => {
    h /= 30;
    return {
        r: fn(h, S, L),
        g: fn(h + 8, S, L),
        b: fn(h + 4, S, L),
    };
};
