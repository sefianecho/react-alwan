import { DEFAULT_COLOR, HSL_FORMAT, RGB_FORMAT, ROOT } from '../constants';
import type { Color, HSLA, RGBA, colorFormat, internalHSL } from '../types';
import { isString, isset } from '../utils/is';
import { PI, boundNumber, float, int, isNumeric, normalizeAngle, round } from '../utils/math';
import { stringify } from './stringify';

/**
 * Regex.
 */
const HSL_REGEX =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(\w*)?\s*[\s,]\s*([+-]?\d*\.?\d+)%?\s*,?\s*([+-]?\d*\.?\d+)%?(?:\s*[/,]\s*([+-]?\d*\.?\d+)(%)?)?\s*\)?$/;
const HEX_REGEX = /^#[0-9a-f]{6}$/i;

/**
 * Used to convert non degrees angles to degrees.
 */
const ANGLE_COEFFICIENT_MAP: { [angle: string]: number } = {
    deg: 1,
    turn: 360,
    rad: 180 / PI,
    grad: 0.9,
};

/**
 * Parses strings and validate color objects.
 * Invalid color values default to DEFAULT_COLOR.
 *
 * @param color - Color value.
 * @param asString - Output the result as a string.
 */
export const parseColor = (
    color: Color,
    asString = false
): string | [color: (internalHSL & HSLA) | RGBA, format: colorFormat] => {
    let parsedColor: (internalHSL & HSLA) | RGBA;
    let format: colorFormat | undefined;
    let str = '';

    /**
     * Validate Non string values, convert color objects into strings.
     * Invalid values default to empty string.
     */
    if (!isString(color)) {
        color = color || {};
        format = [RGB_FORMAT, HSL_FORMAT].find((format) => {
            return format.split('').every((key) => {
                return isNumeric((color as RGBA & HSLA)[key as keyof (RGBA & HSLA)]);
            });
        });

        if (format) {
            str = stringify(color as RGBA | HSLA, format);
        }
    } else {
        str = color.trim();
    }

    const [isHSL, hue, angle, saturation, lightness, alpha, percentage] = HSL_REGEX.exec(str) || [];
    let a: number;
    let s: number;
    let l: number;
    if (isHSL) {
        /**
         * Normalize values.
         *
         * The hue value is so often given in degrees, it can be given as a number, however
         * it might has a unit 'turn', 'rad' (radians) or 'grad' (gradients),
         * If the hue has a unit other than deg, then convert it to degrees.
         */
        s = round(boundNumber(float(saturation)));
        l = round(boundNumber(float(lightness)));
        a = isset(alpha) ? float(alpha) : 1;
        parsedColor = {
            h: normalizeAngle(
                float(hue) * (ANGLE_COEFFICIENT_MAP[angle] ? ANGLE_COEFFICIENT_MAP[angle] : 1)
            ),
            s,
            l,
            S: s / 100,
            L: l / 100,
            a: boundNumber(percentage ? a / 100 : a, 1),
        };
        format = HSL_FORMAT;
    } else {
        const ctx = ROOT.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;

        format = RGB_FORMAT;

        ctx.fillStyle = DEFAULT_COLOR;
        ctx.fillStyle = str;
        str = ctx.fillStyle;

        // ColorString is either hex or rgb string,
        // if it's hex convert it to rgb object,
        // if it's rgb then parse it to object.
        if (HEX_REGEX.test(str)) {
            // Convert hex string to rgb object.
            parsedColor = {
                r: int(str.slice(1, 3), 16),
                g: int(str.slice(3, 5), 16),
                b: int(str.slice(5, 7), 16),
                a: 1,
            };
        } else {
            // Parse rgb string into a rgb object.
            const [r, g, b, a] = (/\((.+)\)/.exec(str) as RegExpExecArray)[1]
                .split(',')
                .map((value) => float(value));
            parsedColor = { r, g, b, a };
        }
    }

    // Round the transparency component to two numbers behind
    parsedColor.a = round(parsedColor.a * 100) / 100;

    return asString ? stringify(parsedColor, format) : [parsedColor, format];
};
