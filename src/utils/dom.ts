import { DOC_ELEMENT } from '../constants';
import type { DOMRectArray } from '../types';

/**
 * Gets element's bounding rect in an array.
 *
 * @param element - Element.
 * @returns
 */
export const getBounds = (element: Element | Document): DOMRectArray => {
    let x: number, y: number, width: number, height: number, right: number, bottom: number;

    if (element instanceof Document) {
        x = y = 0;
        width = right = DOC_ELEMENT.clientWidth;
        height = bottom = DOC_ELEMENT.clientHeight;
    } else {
        ({ x, y, width, height, right, bottom } = element.getBoundingClientRect());
    }

    return [x, y, width, height, right, bottom];
};

/**
 * Translates an HTML Element.
 *
 * @param element - Element to translate.
 * @param x - x coordinate.
 * @param y - y coordinate.
 */
export const translate = (element: HTMLElement, x: number, y: number) => {
    element.style.transform = `translate(${x}px,${y}px)`;
};
