import { DOC_ELEMENT, ROOT } from '../constants';
import type { DOMRectArray } from '../types';

/**
 * Gets element's bounding rect in an array.
 *
 * @param element - Element.
 * @returns
 */
export const getBounds = (element: Element | Document): DOMRectArray => {
    let x: number,
        y: number,
        width: number,
        height: number,
        right: number,
        bottom: number;

    if (element instanceof Document) {
        x = y = 0;
        width = right = DOC_ELEMENT.clientWidth;
        height = bottom = DOC_ELEMENT.clientHeight;
    } else {
        ({ x, y, width, height, right, bottom } =
            element.getBoundingClientRect());
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

/**
 * Gets overflow ancestor of an element (body element is not included).
 *
 * @param element - Target element.
 * @param ancestors - Initial overflow ancestors.
 * @returns - Overflow ancestors.
 */
export const getOverflowAncestors = (
    element: Element | null,
    ancestors: Array<Document | Element> = [ROOT],
): Array<Document | Element> => {
    element = element && element.parentElement;

    if (!element || element === ROOT.body) {
        return ancestors;
    }

    if (
        /auto|scroll|overlay|clip|hidden/.test(
            getComputedStyle(element).overflow,
        )
    ) {
        ancestors.push(element);
    }

    return getOverflowAncestors(element, ancestors);
};

/**
 * Adds/Removes a class from an element.
 *
 * @param element - HTML element.
 * @param token - classname.
 * @param forced - if included add/remove, toggle otherwise.
 */
export const toggleClassName = (
    element: Element,
    token: string,
    forced?: boolean,
) => element.classList.toggle(token, forced);
