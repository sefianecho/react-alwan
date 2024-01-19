import { useCallback, useEffect, useRef } from 'react';
import { DOC_ELEMENT, KEYBOARD_X, KEYBOARD_Y, ROOT } from '../constants';
import { getBounds, toggleClassName, translate } from '../utils/dom';
import { boundNumber, min } from '../utils/math';
import type { paletteProps } from '../types';

/**
 * Color picking area. pick color by dragging the marker (picker).
 */
const Palette = ({ updater, color, canUpdate, disabled }: paletteProps) => {
    const paletteElement = useRef<HTMLDivElement>(null);
    const markerElement = useRef<HTMLDivElement>(null);
    const markerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    /**
     * Moves marker and update color state.
     */
    const moveMarkerAndUpdateColor = useCallback(
        (
            e: PointerEvent | React.PointerEvent | null,
            keyboard = { x: 0, y: 0 },
        ) => {
            const { x: markerX, y: markerY } = markerPosition.current;
            const palette = paletteElement.current as HTMLDivElement;
            let [x, y, width, height] = getBounds(palette);

            if (e) {
                x = e.clientX - x;
                y = e.clientY - y;
            } else {
                x = markerX + keyboard.x * (width / 100);
                y = markerY + keyboard.y * (height / 100);
            }

            x = boundNumber(x, width);
            y = boundNumber(y, height);
            markerPosition.current = { x, y };
            translate(markerElement.current as HTMLDivElement, x, y);

            const v = 1 - y / height;
            const l = v * (1 - x / (2 * width));

            updater({
                s: (l === 1 || l === 0 ? 0 : (v - l) / min(l, 1 - l)) * 100,
                l: l * 100,
            });
        },
        [updater],
    );

    /**
     * Handles drag move.
     *
     * @param e - Pointermove
     */
    const dragMove = (e: PointerEvent) => {
        if (e.buttons) {
            moveMarkerAndUpdateColor(e);
        } else {
            dragEnd();
        }
    };

    /**
     * Handles drag end (release).
     */
    const dragEnd = () => {
        toggleClassName(DOC_ELEMENT, 'alwan__backdrop', false);
        ROOT.removeEventListener('pointermove', dragMove);
    };

    /**
     * Moves marker using keyboard arrow keys.
     *
     * @param e - Keyboard event.
     */
    const handleKeyboard = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const key = e.key;
        const x = KEYBOARD_X[key] || 0;
        const y = KEYBOARD_Y[key] || 0;

        if (x || y) {
            e.preventDefault();
            moveMarkerAndUpdateColor(null, { x, y });
        }
    };

    /**
     * Starts dragging the marker.
     *
     * @param e - Event.
     */
    const dragStart: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!disabled) {
            moveMarkerAndUpdateColor(e);
            toggleClassName(DOC_ELEMENT, 'alwan__backdrop', true);
            ROOT.addEventListener('pointermove', dragMove);
            ROOT.addEventListener('pointerup', dragEnd, { once: true });
        }
    };

    /**
     * Update marker's position from color state.
     */
    useEffect(() => {
        if (canUpdate) {
            let { s, l } = color;
            s /= 100;
            l /= 100;
            const [, , width, height] = getBounds(
                paletteElement.current as HTMLDivElement,
            );
            const v = l + s * min(l, 1 - l);
            const x = (v ? 2 * (1 - l / v) : 0) * width;
            const y = (1 - v) * height;

            markerPosition.current = { x, y };
            translate(markerElement.current as HTMLDivElement, x, y);
        }
    }, [canUpdate, color]);

    return (
        <div
            className='alwan__palette'
            tabIndex={0}
            onPointerDown={dragStart}
            onKeyDown={handleKeyboard}
            ref={paletteElement}
            style={{ '--h': color.h } as React.CSSProperties}
        >
            <div className='alwan__marker' ref={markerElement}></div>
        </div>
    );
};

export default Palette;
