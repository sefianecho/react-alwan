import { useCallback, useEffect, useRef, useState } from 'react';
import './assets/alwan.scss';
import Container from './components/Container';
import Inputs from './components/Inputs';
import Palette from './components/Palette';
import Sliders from './components/Sliders';
import Swatches from './components/Swatches';
import Utility from './components/Utility';
import type { Popover, alwanProps, colorFormat, colorState, popoverAutoUpdate } from './types';
import { ALL_FORMATS, RGB_FORMAT, ROOT } from './constants';
import { createPopover } from './lib/popover';
import { createPortal } from 'react-dom';

const Alwan = ({
    id,
    className,
    theme = 'light',
    toggle = true,
    popover = true,
    position = 'bottom-start',
    margin = 0,
    preview = true,
    copy = true,
    opacity = true,
    inputs = true,
    format = 'rgb',
    singleInput = false,
    swatches = [],
    toggleSwatches = true,
    closeOnScroll = false,
}: alwanProps) => {
    const popoverInstance = useRef<Popover | null>(null);
    const popoverReference = useRef<HTMLButtonElement>(null);
    const popoverContainer = useRef<HTMLDivElement>(null);

    const [formats, setFormats] = useState<colorFormat[]>([]);
    const [currentFormat, setCurrentFormat] = useState<colorFormat>(format);
    const [isOpen, setOpen] = useState(false);
    const [color, setColor] = useState<colorState>({
        h: 0,
        s: 0,
        l: 0,

        r: 0,
        g: 0,
        b: 0,
        a: 1,

        rgb: '',
        hsl: '',
        hex: '',
    });

    /**
     * Picker reference button.
     */
    const button = (
        <button
            type='button'
            className={`alwan__button alwan__preset-button${className ? ' ' + className : ''}`}
            /**
             * Toggle color picker.
             */
            onClick={() => {
                if (toggle) {
                    setOpen(!isOpen);
                }
            }}
            ref={popoverReference}
        ></button>
    );

    /**
     * Picker widget.
     */
    const alwan = (
        <div
            id={id}
            className={`alwan${isOpen ? ' alwan--open' : ''}${popover ? ' alwan--popup' : ''}`}
            data-theme={theme}
            ref={popoverContainer}
        >
            <Palette />
            <Container>
                <Utility preview={preview} copy={copy} />
                <Sliders opacity={opacity} />
            </Container>
            <Inputs
                formats={formats}
                format={currentFormat}
                singleInput={singleInput}
                opacity={opacity}
                changeFormat={(format) => setCurrentFormat(format)}
            />
            <Swatches swatches={swatches} toggle={toggleSwatches} />
        </div>
    );

    /**
     * Updates popover position whenever an overflow ancestor of the
     * popover reference element scrolls or the window resizes.
     */
    const autoUpdate: popoverAutoUpdate = useCallback(
        (update, isInViewport) => {
            if (isOpen || !toggle) {
                if (isInViewport()) {
                    if (isOpen) {
                        update();
                        if (closeOnScroll) {
                            setOpen(false);
                        }
                    } else {
                        setOpen(true);
                    }
                } else {
                    // Close the popover if the reference element is not visible.
                    setOpen(false);
                }
            }
        },
        [isOpen, toggle, closeOnScroll]
    );

    /**
     * Update input formats and current format index.
     */
    useEffect(() => {
        const formats =
            inputs === true ? ALL_FORMATS : ALL_FORMATS.filter((format) => (inputs || {})[format]);

        setFormats(formats);
        setCurrentFormat(formats.includes(format) ? format : RGB_FORMAT);
    }, [inputs, format]);

    /**
     * Create popover.
     */
    useEffect(() => {
        if (popover) {
            const reference = popoverReference.current as HTMLButtonElement;
            const container = popoverContainer.current as HTMLDivElement;
            popoverInstance.current = createPopover(
                reference,
                container,
                { margin, position },
                autoUpdate,
                (e) => {
                    // todo.
                }
            );
        }

        return () => {
            popoverInstance.current?.destroy();
            popoverInstance.current = null;
        };
    }, [popover, margin, position, autoUpdate]);

    return (
        <>
            {popover || toggle ? button : null}
            {popover ? createPortal(alwan, ROOT.body) : alwan}
        </>
    );
};

export default Alwan;
