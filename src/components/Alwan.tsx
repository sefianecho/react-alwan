import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import '../assets/alwan.scss';
import Container from './Container';
import Inputs from './Inputs';
import Palette from './Palette';
import Sliders from './Sliders';
import Swatches from './Swatches';
import Utility from './Utility';
import type {
    HSLA,
    Popover,
    RGBA,
    alwanEvent,
    alwanProps,
    colorFormat,
    colorState,
    colorUpdater,
    colorUpdaterFromValue,
    popoverAutoUpdate,
} from '../types';
import {
    ALL_FORMATS,
    DEFAULT_COLOR,
    HSL_FORMAT,
    I18N_DEFAULTS,
    RGB_FORMAT,
    ROOT,
} from '../constants';
import { createPopover } from '../lib/popover';
import { createPortal } from 'react-dom';
import { round } from '../utils/math';
import { HSLToRGB, RGBToHEX, RGBToHSL } from '../colors/converter';
import { stringify } from '../colors/stringify';
import { parseColor } from '../colors/parser';
import Button from './Button';
import { merge } from '../utils/object';

const Alwan = ({
    id,
    className,
    theme = 'light',
    toggle = true,
    value = DEFAULT_COLOR,
    popover = true,
    position = 'bottom-start',
    margin = 0,
    preview = true,
    copy = true,
    opacity = true,
    inputs = true,
    disabled = false,
    format = 'rgb',
    singleInput = false,
    swatches = [],
    toggleSwatches = false,
    closeOnScroll = false,
    i18n = {},
    onChange,
    onOpen,
    onClose,
}: alwanProps) => {
    const popoverInstance = useRef<Popover | null>(null);
    const popoverReference = useRef<HTMLButtonElement>(null);
    const popoverContainer = useRef<HTMLDivElement>(null);

    const updatePalette = useRef(false);

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
    const eventData = useRef<colorState>(color);

    /**
     * Updates color state.
     *
     * @param hsl - HSL color components.
     * @param source - Element that updating the color.
     * @param updateAll - Whether to update the palette and sliders.
     * @param rgb - RGB color.
     */
    const update: colorUpdater = useCallback(
        (hsl, triggerChange = true, updateAll = false, rgb) => {
            updatePalette.current = updateAll;

            setColor((color) => {
                const previousHex = color.hex;

                merge(color, hsl);
                merge(
                    color,
                    { s: round(color.s), l: round(color.l) },
                    rgb || HSLToRGB(color),
                );

                color.rgb = stringify(color, RGB_FORMAT);
                color.hsl = stringify(color, HSL_FORMAT);
                color.hex = RGBToHEX(color);

                eventData.current = color;

                if (onChange && triggerChange && color.hex !== previousHex) {
                    onChange({ type: 'change', ...color });
                }

                return { ...color };
            });
        },
        [onChange],
    );

    /**
     * Updates color state from a color value (string or object).
     *
     * @param value - Color value.
     * @param source - Element that updating the color.
     */
    const updateFromValue: colorUpdaterFromValue = useCallback(
        (value, triggerChange = true) => {
            const [parsedColor, format] = parseColor(value) as [
                color: RGBA | HSLA,
                format: colorFormat,
            ];

            let rgb: RGBA | undefined;
            let hsl: HSLA;

            if (format === RGB_FORMAT) {
                rgb = parsedColor as RGBA;
                hsl = RGBToHSL(rgb);
            } else {
                hsl = parsedColor as HSLA;
            }

            update(hsl, triggerChange, true, rgb);
        },
        [update],
    );

    const I18N = merge({}, I18N_DEFAULTS, i18n);

    /**
     * Picker reference button.
     */
    const button = (
        <Button
            id={id}
            ref={popoverReference}
            className={`alwan__reference${className ? ' ' + className : ''}`}
            style={{ '--color': color.rgb } as React.CSSProperties}
            disabled={disabled}
            onClick={() => {
                if (toggle) {
                    setOpen(!isOpen);
                }
            }}
        />
    );

    /**
     * Picker widget.
     */
    const alwan = (
        <div
            className={`alwan${isOpen ? ' alwan--open' : ''}`}
            data-display={popover ? 'popover' : 'block'}
            data-theme={theme}
            style={
                {
                    '--rgb': `${color.r},${color.g},${color.b}`,
                    '--a': color.a,
                } as CSSProperties
            }
            ref={popoverContainer}
        >
            <Palette
                updater={update}
                color={color}
                canUpdate={updatePalette.current}
                disabled={disabled}
                i18n={I18N.palette}
            />
            <Container>
                <Utility
                    preview={preview}
                    copy={copy}
                    color={color[currentFormat]}
                    disabled={disabled}
                    i18n={I18N.copyBtn}
                />
                <Sliders
                    opacity={opacity}
                    updater={update}
                    color={color}
                    disabled={disabled}
                    i18n={{
                        hue: I18N.hueSlider,
                        alpha: I18N.alphaSlider,
                    }}
                />
            </Container>
            <Inputs
                color={color}
                formats={formats}
                format={currentFormat}
                singleInput={singleInput}
                opacity={opacity}
                updater={updateFromValue}
                changeFormat={(format) => setCurrentFormat(format)}
                disabled={disabled}
                close={() => {
                    toggle && setOpen(false);
                }}
                i18n={I18N.changeFormatBtn}
            />
            <Swatches
                swatches={swatches}
                toggle={toggleSwatches}
                updater={updateFromValue}
                disabled={disabled}
                popover={popoverInstance.current}
                i18n={{
                    swatches: I18N.swatchBtn,
                    toggle: I18N.toggleSwatchesBtn,
                }}
            />
        </div>
    );

    /**
     * Updates popover position whenever an overflow ancestor of the
     * popover reference element scrolls or the window resizes.
     */
    const autoUpdate: popoverAutoUpdate = useCallback(
        (update, isInViewport, isScroll) => {
            if (isOpen || !toggle) {
                if (isInViewport()) {
                    if (isOpen) {
                        update();
                        if (isScroll && closeOnScroll && toggle) {
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
        [closeOnScroll, isOpen, toggle],
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
                        ![...reference.labels].some((label) =>
                            label.contains(target),
                        ) &&
                        !container.contains(target))
                ) {
                    if (toggle) {
                        setOpen(false);
                    }
                } else if (key === 'Tab') {
                    const focusableElements = [
                        ...container.querySelectorAll<HTMLElement>(
                            'button,input,[tabindex]',
                        ),
                    ];
                    const firstFocusableElement = focusableElements[0];
                    const lastFocusableElement =
                        focusableElements.pop() as HTMLElement;
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
        [toggle, isOpen],
    );

    /**
     * Update input formats and current format index.
     */
    useEffect(() => {
        const formats =
            inputs === true
                ? ALL_FORMATS
                : ALL_FORMATS.filter((format) => (inputs || {})[format]);
        const validFormats = formats.length ? formats : ALL_FORMATS;

        setFormats(formats);
        setCurrentFormat(
            validFormats.includes(format) ? format : validFormats[0],
        );
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
                popoverAccessibility,
            );
        }

        return () => {
            popoverInstance.current?.destroy();
            popoverInstance.current = null;
        };
    }, [popover, margin, position, autoUpdate, popoverAccessibility]);

    /**
     * Fire open and close events.
     * Gets color details (value) on open/close.
     */
    useEffect(() => {
        const e: alwanEvent = {
            type: isOpen ? 'open' : 'close',
            ...eventData.current,
        };
        if (isOpen) {
            onOpen && onOpen(e);
        } else {
            onClose && onClose(e);
        }
    }, [isOpen, onClose, onOpen]);

    /**
     * Update color from value Prop.
     */
    useEffect(() => {
        updateFromValue(value, false);
    }, [updateFromValue, value]);

    /**
     * Updates color picker visibility when disabled and toggle props change.
     */
    useEffect(() => {
        if (disabled) {
            // Disable alwan cause it to close when it's displayed as popover or
            // can toggle.
            // Open the color picker if popover and toggler both became false.
            setOpen(!popover && !toggle);
        } else if (
            // Open picker if toggle prop changed to true or picker became enabled and toggle
            // is off.
            // When it displayed as popover, only open it if the reference button is visible
            // in the viewport.
            !toggle &&
            (!popover ||
                (popover &&
                    popoverInstance.current &&
                    popoverInstance.current.isVisible()))
        ) {
            setOpen(true);
        }
    }, [disabled, popover, toggle]);

    return (
        <>
            {popover || toggle ? button : null}
            {popover ? createPortal(alwan, ROOT.body) : alwan}
        </>
    );
};

export default Alwan;
