export type colorFormat = 'rgb' | 'hsl' | 'hex';
type side = 'top' | 'right' | 'bottom' | 'left';
export type popoverPosition = side | `${side}-${'start' | 'center' | 'end'}`;

export interface alwanProps {
    /**
     * Set color picker id.
     *
     * @default ''
     */
    id?: string;

    /**
     * Add classname to the reference button.
     *
     * @default ''
     */
    className?: string;

    /**
     * Choose a theme.
     *
     * @default 'light'
     */
    theme?: 'light' | 'dark';

    /**
     * Toggle picker's visibility (Show/Hide), Setting this to false keeps the picker visible.
     *
     * @default true
     */
    toggle?: boolean;

    /**
     * Display the picker container as a pop-up (a box that floats on top of the page content),
     * if it's false, picker container will be displayed as a block (embedded in the page's content).
     *
     * @default true
     */
    popover?: boolean;

    /**
     * Set the position of the popper (if popover is set to true) relative to the reference element,
     * the position has two values separated by a dash (-),
     * the first value is the direction (top, bottom, right, left),
     * the second value is the alignment (start, center, end), omitting this value will default to center.
     * e.g. 'bottom-start': 'bottom' places the picker below the reference element,
     * and 'start' aligns the left side of the container with the left side of the reference element.
     * Note:
     * If the picker container has no space to be placed, it will auto-position itself.
     * based on the available space.
     *
     * @default 'bottom-start'
     */
    position?: popoverPosition;

    /**
     * Set the gap (in pixels) between the picker container and the reference element.
     *
     * @default 0
     */
    margin?: number;

    /**
     * Preview the color.
     *
     * @default true
     */
    preview?: boolean;

    /**
     * Add/Remove a copy button.
     *
     * @default true
     */
    copy?: boolean;

    /**
     * Support alpha channel and display opacity slider.
     *
     * @default true
     */
    opacity?: boolean;

    /**
     * Disable the picker, users won't be able to pick colors.
     *
     * @default false
     */
    disabled: boolean;

    /**
     * Color picker value.
     *
     * @default '#000'
     */
    value?: Color;

    /**
     * For the formats 'hsl' and 'rgb', choose a single input to display the color string,
     * or if false, display an input for each color channel.
     *
     * @default false
     */
    singleInput?: boolean;

    /**
     * Input(s) field(s) for each color format. if this option is set to true then all formats are,
     * selected.
     *
     * @default { rgb: true, hsl: true, hex: true }
     *
     */
    inputs?: boolean | Partial<Record<colorFormat, boolean>>;

    /**
     * Initial color format.
     *
     * @default 'rgb'
     */
    format?: colorFormat;

    /**
     * Array of color swatches, invalid values will default to rgb(0,0,0).
     *
     * @default []
     */
    swatches?: Color[];

    /**
     * Make swatches container collapsible.
     *
     * @default false
     */
    toggleSwatches?: boolean;

    /**
     * Close the color picker when scrolling.
     *
     * @default false
     */
    closeOnScroll?: boolean;

    /**
     * On Change event fired whenever the color changes.
     *
     * @default undefined;
     */
    onChange?: (ev: alwanEvent) => void;
}

export interface RGB {
    /**
     * Red.
     */
    r: number;

    /**
     * Green.
     */
    g: number;

    /**
     * Blue.
     */
    b: number;
}

interface A {
    /**
     * Alpha channel (opacity)
     */
    a: number;
}

export interface RGBA extends RGB, A {}

export interface HSL {
    /**
     * Hue.
     */
    h: number;

    /**
     * Saturation.
     */
    s: number;

    /**
     * Lightness.
     */
    l: number;
}

export interface HSLA extends HSL, A {}

export interface colorState extends RGBA, HSL {
    /**
     * Saturation used internally its value is between 0-1.
     */
    S: number;

    /**
     * Lightness used internally its value is between 0-1.
     */
    L: number;

    /**
     * RGB color string.
     */
    rgb: string;

    /**
     * HSL color string.
     */
    hsl: string;

    /**
     * Hex color.
     */
    hex: string;

    /**
     * Hex color without opacity.
     */
    opaque: string;
}

export type inputValues = {
    [P in keyof colorState]: colorState[P] extends number ? number | string : string;
};

export type Color = string | RGB | RGBA | HSL | HSLA;

export type DOMRectArray = [
    x: number,
    y: number,
    width: number,
    height: number,
    right: number,
    bottom: number
];

export interface paletteProps {
    updater: colorUpdater;
    color: colorState;
    /**
     * Can palette update the marker position from color state.
     */
    canUpdate: boolean;
    disabled: boolean;
}

export interface utilityProps {
    color: colorState;
    copy: boolean;
    preview: boolean;
    format: colorFormat;
    disabled: boolean;
}

export interface slidersProps {
    opacity: boolean;
    updater: colorUpdater;
    color: colorState;
    disabled: boolean;
}

export interface inputsProps {
    color: colorState;
    formats: colorFormat[];
    format: colorFormat;
    singleInput: boolean;
    opacity: boolean;
    updater: colorUpdaterFromValue;
    changeFormat: (format: colorFormat) => void;
    disabled: boolean;
}

export interface swatchesProps {
    updater: colorUpdaterFromValue;
    swatches: Color[];
    toggle: boolean;
    disabled: boolean;
}

export interface popoverOptions {
    margin?: number;
    position?: popoverPosition;
}
export interface popoverFlipOrder {
    [key: string]: number[];
}
export type popoverAutoUpdate = (update: () => void, isInViewport: () => boolean) => void;
export interface Popover {
    update(): void;
    destroy(): void;
}
export interface internalHSL {
    h?: number;
    S?: number;
    L?: number;
    a?: number;
}
export type colorUpdater = (
    hsl: internalHSL,
    source?: HTMLElement,
    updateAll?: boolean,
    rgb?: RGBA
) => void;
export type colorUpdaterFromValue = (value: Color, source?: HTMLElement) => void;

export type alwanEventType = 'change' | 'open' | 'close';
export interface alwanEvent extends Readonly<RGBA>, Readonly<HSL> {
    readonly type: alwanEventType;
    readonly source: HTMLElement | undefined;
    readonly rgb: string;
    readonly hsl: string;
    readonly hex: string;
}
