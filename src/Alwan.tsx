import { useCallback, useEffect, useRef, useState } from 'react';
import './assets/alwan.scss';
import Container from './components/Container';
import Inputs from './components/Inputs';
import Palette from './components/Palette';
import Sliders from './components/Sliders';
import Swatches from './components/Swatches';
import Utility from './components/Utility';
import type {
    HSLA,
    Popover,
    RGBA,
    alwanProps,
    colorFormat,
    colorState,
    colorUpdater,
    colorUpdaterFromValue,
    internalHSL,
    popoverAutoUpdate,
} from './types';
import { ALL_FORMATS, HSL_FORMAT, RGB_FORMAT, ROOT } from './constants';
import { createPopover } from './lib/popover';
import { createPortal } from 'react-dom';
import { round } from './utils/math';
import { HSLToRGB, RGBToHEX, RGBToHSL } from './colors/converter';
import { stringify } from './colors/stringify';
import { parseColor } from './colors/parser';

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
    onChange,
}: alwanProps) => {
    const popoverInstance = useRef<Popover | null>(null);
    const popoverReference = useRef<HTMLButtonElement>(null);
    const popoverContainer = useRef<HTMLDivElement>(null);

    const updatePaletteAndSliders = useRef(false);

    const [formats, setFormats] = useState<colorFormat[]>([]);
    const [currentFormat, setCurrentFormat] = useState<colorFormat>(format);
    const [isOpen, setOpen] = useState(false);
    const [color, setColor] = useState<colorState>({
        h: 0,
        s: 0,
        l: 0,

        S: 0,
        L: 0,

        r: 0,
        g: 0,
        b: 0,
        a: 1,

        rgb: '',
        hsl: '',
        hex: '',
        opaque: '',
    });

    /**
     * Updates color state.
     *
     * @param hsl - HSL color components.
     * @param source - Element that updating the color.
     * @param updateAll - Whether to update the palette and sliders.
     * @param rgb - RGB color.
     */
    const update: colorUpdater = (hsl, source, updateAll = false, rgb) => {
        updatePaletteAndSliders.current = updateAll;

        setColor((color) => {
            const { r, g, b, a } = color;

            color = { ...color, ...hsl };
            color = {
                ...color,
                s: round(color.S * 100),
                l: round(color.L * 100),
                ...(rgb || HSLToRGB(color)),
            };

            // If color changes then update color strings and with them update UI.
            if (color.r !== r || color.g !== g || color.b !== b || color.a !== a) {
                const [opaque, alphaHex] = RGBToHEX(color);

                color.rgb = stringify(color, RGB_FORMAT);
                color.hsl = stringify(color, HSL_FORMAT);
                color.hex = opaque + alphaHex;
                color.opaque = opaque;

                if (source && onChange) {
                    onChange();
                }
            }

            return color;
        });
    };

    /**
     * Updates color state from a color value (string or object).
     *
     * @param value - Color value.
     * @param source - Element that updating the color.
     */
    const updateFromValue: colorUpdaterFromValue = (value, source) => {
        const [parsedColor, format] = parseColor(value) as [
            color: RGBA | (internalHSL & HSLA),
            format: colorFormat
        ];

        let rgb: RGBA | undefined;
        let hsl: (internalHSL & HSLA) | internalHSL;

        if (format === RGB_FORMAT) {
            rgb = parsedColor as RGBA;
            hsl = RGBToHSL(rgb);
        } else {
            hsl = parsedColor as internalHSL & HSLA;
        }

        update(hsl, source, true, rgb);
    };

    /**
     * Picker reference button.
     */
    const button = (
        <button
            id={id}
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
            className={`alwan${isOpen ? ' alwan--open' : ''}${popover ? ' alwan--popup' : ''}`}
            data-theme={theme}
            ref={popoverContainer}
        >
            <Palette updater={update} color={color} canUpdate={updatePaletteAndSliders.current} />
            <Container>
                <Utility preview={preview} copy={copy} color={color} />
                <Sliders opacity={opacity} updater={update} color={color} />
            </Container>
            <Inputs
                color={color}
                formats={formats}
                format={currentFormat}
                singleInput={singleInput}
                opacity={opacity}
                updater={updateFromValue}
                changeFormat={(format) => setCurrentFormat(format)}
            />
            <Swatches swatches={swatches} toggle={toggleSwatches} updater={updateFromValue} />
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
     * Handles popover accessibility.
     * Link focus the reference button with the container's first and last focusable element.
     * close popover if the Escape key is pressed or a click (touch) occurred outside of the
     * popover.
     */
    const popoverAccessibility = useCallback(
        (e: Event | PointerEvent | KeyboardEvent) => {
            if (isOpen) {
                const target = e.target as Node;
                const { key, shiftKey } = e as KeyboardEvent;
                const reference = popoverReference.current as HTMLButtonElement;
                const container = popoverContainer.current as HTMLDivElement;

                if (
                    // Pressing the Escape key or Clicking away closes the popover.
                    key === 'Escape' ||
                    (target !== reference &&
                        ![...reference.labels].some((label) => label.contains(target)) &&
                        !container.contains(target))
                ) {
                    if (toggle) {
                        setOpen(false);
                    }
                } else if (key === 'Tab') {
                    const focusableElements = [
                        ...container.querySelectorAll<HTMLElement>('button,input,[tabindex]'),
                    ];
                    const firstFocusableElement = focusableElements[0];
                    const lastFocusableElement = focusableElements.pop() as HTMLElement;
                    let elementToFocus: HTMLElement | undefined;

                    // Pressing tab while focusing on the reference element (picker button),
                    // sends focus to the palette.
                    if (target === reference && !shiftKey) {
                        elementToFocus = firstFocusableElement;
                    } else if (
                        // Pressing Tab or shift + Tab while focusing on the last focusable element,
                        // or the first focusable element respectively sends focus to the reference,
                        // element (picker button)
                        (shiftKey && target === firstFocusableElement) ||
                        (!shiftKey && target === lastFocusableElement)
                    ) {
                        elementToFocus = reference;
                    }

                    if (elementToFocus) {
                        e.preventDefault();
                        elementToFocus.focus();
                    }
                }
            }
        },
        [toggle, isOpen]
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
            popoverInstance.current = createPopover(
                popoverReference.current as HTMLButtonElement,
                popoverContainer.current as HTMLDivElement,
                { margin, position },
                autoUpdate,
                popoverAccessibility
            );
        }

        return () => {
            popoverInstance.current?.destroy();
            popoverInstance.current = null;
        };
    }, [popover, margin, position, autoUpdate, popoverAccessibility]);

    return (
        <>
            {popover || toggle ? button : null}
            {popover ? createPortal(alwan, ROOT.body) : alwan}
        </>
    );
};

export default Alwan;
