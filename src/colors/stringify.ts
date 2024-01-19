import { RGB_FORMAT } from '../constants';
import type {
    HSLA,
    RGBA,
    colorFormat,
    colorState,
    inputValues,
} from '../types';

/**
 * Converts RGB or HSL color objects to string.
 *
 * @param color - HSL or RGB color object.
 * @param format - Color format (hex, rgb or hsl).
 */
export const stringify = (
    color: RGBA | HSLA | colorState | inputValues,
    format: colorFormat,
) => {
    const a = color.a;
    let opacity = '';
    let str = format;

    if (+a < 1) {
        str += 'a';
        opacity = ', ' + a;
    }

    if (format === RGB_FORMAT) {
        return (
            str +
            `(${(<RGBA>color).r}, ${(<RGBA>color).g}, ${(<RGBA>color).b + opacity})`
        );
    }

    return (
        str +
        `(${(<HSLA>color).h}, ${(<HSLA>color).s}%, ${(<HSLA>color).l}%${opacity})`
    );
};
