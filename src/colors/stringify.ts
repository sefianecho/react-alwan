import { RGB_FORMAT } from '../constants';
import type { HSLA, RGBA, colorFormat, colorState } from '../types';

/**
 * Converts RGB or HSL color objects to string.
 *
 * @param color - HSL or RGB color object.
 * @param format - Color format (hex, rgb or hsl).
 */
export const stringify = (color: RGBA | HSLA | colorState, format: colorFormat) => {
    const a = color.a;
    let opacity = '';
    let str = format;

    if (a < 1) {
        str += 'a';
        opacity = ', ' + a;
    }

    if (format === RGB_FORMAT) {
        color = color as RGBA;
        return str + `(${color.r}, ${color.g}, ${color.b + opacity})`;
    }

    color = color as HSLA;
    return str + `(${color.h}, ${color.s}%, ${color.l}%${opacity})`;
};
