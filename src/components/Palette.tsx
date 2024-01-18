import { useCallback, useEffect, useRef, useState } from 'react';
import {
    KEYBOARD_X,
    KEYBOARD_Y,
    POINTER_MOVE,
    POINTER_UP,
    ROOT,
} from '../constants';
import { getBounds, translate } from '../utils/dom';
import { boundNumber, min } from '../utils/math';
import { createPortal } from 'react-dom';
import type { paletteProps } from '../types';

/**
 * Color picking area. pick color by dragging the marker (picker).
 */
const Palette = ({ updater, color, canUpdate, disabled }: paletteProps) => {
    const paletteElement = useRef<HTMLDivElement>(null);
    const markerElement = useRef<HTMLDivElement>(null);
    const markerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const [isPointerDown, setPointerDown] = useState(false);

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
            let v: number, L: number;

            if (e) {
                x = e.clientX - x;
                y = e.clientY - y;
            } else {
                x = markerX + keyboard.x * (width / 100);
                y = markerY + keyboard.y * (height / 100);
            }

            x = boundNumber(x, width);
            y = boundNumber(y, height);

            if (x !== markerX || y !== markerY) {
                markerPosition.current = { x, y };
                translate(markerElement.current as HTMLDivElement, x, y);

                v = 1 - y / height;
                L = v * (1 - x / (2 * width));

                updater(
                    {
                        S: L === 1 || L === 0 ? 0 : (v - L) / min(L, 1 - L),
                        L,
                    },
                    palette,
                );
            }
        },
        [updater],
    );

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
            setPointerDown(true);
            moveMarkerAndUpdateColor(e);
        }
    };

    /**
     * Drag marker.
     */
    useEffect(() => {
        /**
         * Dragging the marker.
         *
         * @param e - Event.
         */
        const dragMove = (e: PointerEvent) => {
            if (isPointerDown) {
                moveMarkerAndUpdateColor(e);
            }
        };

        /**
         * Drag end (released the marker)
         */
        const dragEnd = () => {
            if (isPointerDown) {
                setPointerDown(false);
            }
        };

        ROOT.addEventListener(POINTER_MOVE, dragMove);
        ROOT.addEventListener(POINTER_UP, dragEnd);

        return () => {
            ROOT.removeEventListener(POINTER_MOVE, dragMove);
            ROOT.removeEventListener(POINTER_UP, dragEnd);
        };
    });

    /**
     * Update marker's position from color state.
     */
    useEffect(() => {
        if (canUpdate) {
            const [, , width, height] = getBounds(
                paletteElement.current as HTMLDivElement,
            );
            const { S, L } = color;
            const v = L + S * min(L, 1 - L);
            const x = (v ? 2 * (1 - L / v) : 0) * width;
            const y = (1 - v) * height;

            markerPosition.current = { x, y };
            translate(markerElement.current as HTMLDivElement, x, y);
        }
    }, [canUpdate, color]);

    return (
        <>
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
            {isPointerDown
                ? createPortal(
                      <div className='alwan__backdrop'></div>,
                      ROOT.body,
                  )
                : null}
        </>
    );
};

export default Palette;
