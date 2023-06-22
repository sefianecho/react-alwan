import type { colorFormat } from './types';

export const ROOT = document;
export const DOC_ELEMENT = ROOT.documentElement;
export const POINTER_DOWN = 'pointerdown';
export const POINTER_MOVE = 'pointermove';
export const POINTER_UP = 'pointerup';
export const KEY_DOWN = 'keydown';
export const SCROLL = 'scroll';
export const RESIZE = 'resize';

export const DEFAULT_COLOR = '#000';
/**
 * Move marker vertically using the keyboard arrow keys
 */
export const KEYBOARD_Y: { [key: string]: number } = {
    ArrowDown: 1,
    ArrowUp: -1,
};

/**
 * Move marker horizontally using the keyboard arrow keys.
 */
export const KEYBOARD_X: { [key: string]: number } = {
    ArrowRight: 1,
    ArrowLeft: -1,
};

export const RGB_FORMAT: colorFormat = 'rgb';
export const HSL_FORMAT: colorFormat = 'hsl';
export const HEX_FORMAT: colorFormat = 'hex';

export const ALL_FORMATS: colorFormat[] = [RGB_FORMAT, HSL_FORMAT, HEX_FORMAT];
