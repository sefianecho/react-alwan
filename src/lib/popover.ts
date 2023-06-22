import { KEY_DOWN, POINTER_DOWN, RESIZE, ROOT, SCROLL } from '../constants';
import type { Popover, popoverAutoUpdate, popoverFlipOrder, popoverOptions } from '../types';
import { getBounds, getOverflowAncestors, translate } from '../utils/dom';
import { isString, isset } from '../utils/is';
import { abs, float, isNumeric, round } from '../utils/math';

// Side indexes. these indexes are chosen from the array output of,
// getBounds function array.
const LEFT = 0; // Also the x coordinate.
const TOP = 1; // Also the y coordinate.
const RIGHT = 4;
const BOTTOM = 5;

const START = 0;
const CENTER = 1;
const END = 2;

/**
 * Sides to fallback to for each side.
 */
const fallbackSides: popoverFlipOrder = {
    top: [TOP, BOTTOM, RIGHT, LEFT],
    bottom: [BOTTOM, TOP, RIGHT, LEFT],
    right: [RIGHT, LEFT, TOP, BOTTOM],
    left: [LEFT, RIGHT, TOP, BOTTOM],
};
/**
 * Alignments to fallback to for each alignment.
 */
const fallbackAlignments: popoverFlipOrder = {
    start: [START, CENTER, END],
    center: [CENTER, START, END],
    end: [END, CENTER, START],
};

/**
 * Creates a Popover instance.
 *
 * @param target - Popover target.
 * @param container - Popover container.
 * @param param2 - Popover options.
 * @param autoUpdate - Auto update function.
 * @param accessibility - Popover accessibility.
 */
export const createPopover = (
    target: Element,
    container: HTMLElement,
    { margin = 0, position }: popoverOptions,
    autoUpdate: popoverAutoUpdate,
    accessibility: EventListenerOrEventListenerObject
): Popover => {
    if (isString(margin)) {
        margin = float(margin);
    }
    margin = isNumeric(margin) ? margin : 0;
    const [side, alignment] = isString(position) ? position.split('') : [];
    const sidesFlipOrder = fallbackSides[side] || fallbackSides.bottom;
    const alignmentsFlipOrder = fallbackAlignments[alignment] || fallbackAlignments.center;
    const overflowAncestors = getOverflowAncestors(target);

    /**
     * Updates the container's position.
     */
    const update = () => {
        const visualViewport = getBounds(ROOT);
        const targetBounds = getBounds(target);
        const containerBounds = getBounds(container);
        const coordinates: [x: number | null, y: number | null] = [null, null];

        /**
         * Check sides.
         */
        sidesFlipOrder.some((side) => {
            // Get axis of the side.
            // x (0) if side is LEFT (1) or RIGHT (4).
            // y (1) if side is TOP (0) or BOTTOM (5).
            let axis = side % 2;
            // Viewport side.
            const domSide = visualViewport[side];
            // Target element coordinate.
            const targetSide = targetBounds[side];
            // Space required for the container.
            // Adding 2 to the axis index gives the dimension based on the axis,
            // x => width and y => height.
            const requiredSpace = margin + containerBounds[axis + 2];

            if (requiredSpace <= abs(domSide - targetSide)) {
                // Calculate coordinate to set this side.
                // side <= 1 means side is either TOP or LEFT.
                // otherwise it's BOTTOM or RIGHT.
                coordinates[axis] = targetSide + (side <= 1 ? -requiredSpace : margin);
                // Reverse the axis for the alignments.
                // x (0) => y (1)
                // y (1) => x (0)
                axis = (axis + 1) % 2;
                const containerDimension = containerBounds[axis + 2];
                // Lower bound is either the TOP | LEFT coordinate and,
                // the Upper bound is either the BOTTOM | RIGHT coordinates of the target element.
                // depends on the axis.
                const targetLowerBound = targetBounds[axis];
                const targetUpperBound = targetBounds[axis + 4];
                // Distance between the document upper bound (BOTTOM or RIGHT) and,
                // the target element lower bound (TOP or LEFT).
                const upperBoundDistance = visualViewport[axis + 4] - targetLowerBound;
                // Offset between the container and the reference element.
                const offset = (containerDimension + targetBounds[axis + 2]) / 2;

                /**
                 * Check alignments, only if the container is attached to one side.
                 */
                alignmentsFlipOrder.some((alignment) => {
                    // Check space, if it's available then align the container.
                    if (alignment === START && containerDimension <= upperBoundDistance) {
                        coordinates[axis] = targetLowerBound;
                        return true;
                    }
                    if (
                        alignment === CENTER &&
                        offset <= targetUpperBound &&
                        offset <= upperBoundDistance
                    ) {
                        coordinates[axis] = targetUpperBound - offset;
                        return true;
                    }
                    if (alignment === END && containerDimension <= targetUpperBound) {
                        coordinates[axis] = targetUpperBound - containerDimension;
                        return true;
                    }
                    return false;
                });

                return true;
            }
        });

        // If there is no space to position the popover in all sides,
        // then center the popover in the screen.
        // If the popover is attached to one side but there is no space,
        // for the alignment then center it horizontally/vertically depends on the side.
        translate(
            container,
            ...(coordinates.map((value, axis) =>
                round(
                    isset(value)
                        ? value
                        : (visualViewport[axis + 4] - containerBounds[axis + 2]) / 2
                )
            ) as [x: number, y: number])
        );
    };

    /**
     * Checks if target element is visible is the viewport.
     */
    const isVisible = () => {
        return overflowAncestors.every((ancestor) => {
            const [x, y, , , right, bottom] = getBounds(target);
            const [ancestorX, ancestorY, , , ancestorRight, ancestorBottom] = getBounds(ancestor);

            return (
                y < ancestorBottom && bottom > ancestorY && x < ancestorRight && right > ancestorX
            );
        });
    };

    /**
     * Target overflow ancestors onScroll and window onResize event handler.
     */
    const eventHandler = () => {
        autoUpdate(update, isVisible);
    };

    /**
     * Attach/Detach popover event listeners.
     */
    const popoverEvents = (method: 'addEventListener' | 'removeEventListener') => {
        overflowAncestors.forEach((ancestor) => {
            ancestor[method](SCROLL, eventHandler);
        });
        window[method](RESIZE, eventHandler);
        ROOT[method](KEY_DOWN, accessibility);
        ROOT[method](POINTER_DOWN, accessibility);
    };

    update();
    // Attach listeners.
    popoverEvents('addEventListener');

    return {
        update,
        /**
         * Remove popover side effects.
         */
        destroy() {
            // Remove listeners.
            popoverEvents('removeEventListener');
            container.style.transform = '';
        },
    };
};
