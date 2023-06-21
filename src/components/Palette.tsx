import { useCallback, useEffect, useRef, useState } from 'react';
import { KEYBOARD_X, KEYBOARD_Y, POINTER_MOVE, POINTER_UP, ROOT } from '../constants';
import { getBounds, translate } from '../utils/dom';
import { boundNumber } from '../utils/math';
import { createPortal } from 'react-dom';

/**
 * Color picking area. pick color by dragging the marker (picker).
 */
const Palette = () => {
    const paletteElement = useRef<HTMLDivElement>(null);
    const markerElement = useRef<HTMLDivElement>(null);
    const markerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const [isPointerDown, setPointerDown] = useState(false);

    /**
     * Moves marker.
     */
    const moveMarker = useCallback(
        (e: PointerEvent | React.PointerEvent | null, keyboard = { x: 0, y: 0 }) => {
            const { x: markerX, y: markerY } = markerPosition.current;
            let [x, y, width, height] = getBounds(paletteElement.current as HTMLDivElement);

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
            }
        },
        []
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
            moveMarker(null, { x, y });
        }
    };

    /**
     * Starts dragging the marker.
     *
     * @param e - Event.
     */
    const dragStart: React.PointerEventHandler<HTMLDivElement> = (e) => {
        setPointerDown(true);
        moveMarker(e);
    };

    useEffect(() => {
        /**
         * Dragging the marker.
         *
         * @param e - Event.
         */
        const dragMove = (e: PointerEvent) => {
            if (isPointerDown) {
                moveMarker(e);
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

    return (
        <>
            <div
                className='alwan__palette'
                tabIndex={0}
                onPointerDown={dragStart}
                onKeyDown={handleKeyboard}
                ref={paletteElement}
            >
                <div className='alwan__marker' ref={markerElement}></div>
            </div>
            {isPointerDown
                ? createPortal(<div className='alwan__backdrop'></div>, ROOT.body)
                : null}
        </>
    );
};

export default Palette;
