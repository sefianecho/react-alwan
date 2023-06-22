export type colorFormat = 'rgb' | 'hsl' | 'hex';
type side = 'top' | 'right' | 'bottom' | 'left';
export type popoverPosition = side | `${side}-${'start' | 'center' | 'end'}`;

export interface alwanProps {
    /**
     * Set the container's (widget) id.
     *
     * @default ''
     */
    id: string;

    /**
     * Add classname to the reference button.
     *
     * @default ''
     */
    className: string;

    /**
     * Choose a theme.
     *
     * @default 'light'
     */
    theme: 'light' | 'dark';

    /**
     * Toggle picker's visibility (Show/Hide), Setting this to false keeps the picker visible.
     *
     * @default true
     */
    toggle: boolean;

    /**
     * Display the picker container as a pop-up (a box that floats on top of the page content),
     * if it's false, picker container will be displayed as a block (embedded in the page's content).
     *
     * @default true
     */
    popover: boolean;

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
    position: popoverPosition;

    /**
     * Set the gap (in pixels) between the picker container and the reference element.
     *
     * @default 0
     */
    margin: number;

    /**
     * Preview the color.
     *
     * @default true
     */
    preview: boolean;

    /**
     * Add/Remove a copy button.
     *
     * @default true
     */
    copy: boolean;

    /**
     * Support alpha channel and display opacity slider.
     *
     * @default true
     */
    opacity: boolean;

    /**
     * For the formats 'hsl' and 'rgb', choose a single input to display the color string,
     * or if false, display an input for each color channel.
     *
     * @default false
     */
    singleInput: boolean;

    /**
     * Input(s) field(s) for each color format. if this option is set to true then all formats are,
     * selected.
     *
     * @default { rgb: true, hsl: true, hex: true }
     *
     */
    inputs: boolean | Partial<Record<colorFormat, boolean>>;

    /**
     * Initial color format.
     *
     * @default 'rgb'
     */
    format: colorFormat;

    /**
     * Array of color swatches, invalid values will default to rgb(0,0,0).
     *
     * @default []
     */
    swatches: Color[];

    /**
     * Make swatches container collapsible.
     *
     * @default false
     */
    toggleSwatches: boolean;
}

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface RGBA extends RGB {
    a: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
}

export interface HSLA extends HSL {
    a: number;
}

export interface colorState extends RGBA, HSL {
    rgb: string;
    hsl: string;
    hex: string;
}

export type Color = string | RGB | RGBA | HSL | HSLA;

export type DOMRectArray = [
    x: number,
    y: number,
    width: number,
    height: number,
    right: number,
    bottom: number
];

export interface utilityProps {
    copy: boolean;
    preview: boolean;
}

export interface slidersProps {
    opacity: boolean;
}

export interface inputsProps {
    formats: colorFormat[];
    format: colorFormat;
    singleInput: boolean;
    opacity: boolean;
    changeFormat: (format: colorFormat) => void;
}

export interface swatchesProps {
    swatches: Color[];
    toggle: boolean;
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
