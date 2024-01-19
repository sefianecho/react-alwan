import type { HSLA, RGB, RGBA, colorState } from '../types';
import { abs, max, min, normalizeAngle, round } from '../utils/math';

/**
 * Converts a decimal number to hexadecimal.
 *
 * @param number - A decimal number.
 */
const toHex = (number: number) => {
    return (number < 16 ? '0' : '') + number.toString(16);
};

/**
 * Converts RGB to Hex color format.
 */
export const RGBToHEX = ({ r, g, b, a }: colorState) =>
    '#' + toHex(r) + toHex(g) + toHex(b) + (a < 1 ? toHex(round(a * 255)) : '');

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
export const HSLToRGB = ({ h, s, l }: colorState): RGB => {
    h /= 30;
    s /= 100;
    l /= 100;
    return {
        r: fn(h, s, l),
        g: fn(h + 8, s, l),
        b: fn(h + 4, s, l),
    };
};

/**
 * Converts RGB to HSL.
 *
 * @param param0 - RGB color object.
 * @returns - HSL color object.
 */
export const RGBToHSL = ({ r, g, b, a }: RGBA): HSLA => {
    r /= 255;
    g /= 255;
    b /= 255;

    const cMax = max(r, g, b);
    const cMin = min(r, g, b);
    const d = cMax - cMin;
    const l = (cMax + cMin) / 2;
    const h =
        d === 0
            ? 0
            : cMax === r
              ? ((g - b) / d) % 6
              : cMax === g
                ? (b - r) / d + 2
                : cMax === b
                  ? (r - g) / d + 4
                  : 0;

    return {
        h: normalizeAngle(h * 60),
        s: d ? (d * 100) / (1 - abs(2 * l - 1)) : 0,
        l: l * 100,
        a,
    };
};
