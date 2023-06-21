export const ROOT = document;
export const DOC_ELEMENT = ROOT.documentElement;
export const POINTER_MOVE = 'pointermove';
export const POINTER_UP = 'pointerup';
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
