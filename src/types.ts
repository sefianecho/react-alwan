export type colorFormat = 'rgb' | 'hsl' | 'hex';

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

export type DOMRectArray = [
    x: number,
    y: number,
    width: number,
    height: number,
    right: number,
    bottom: number
];

export interface buttonProps extends React.PropsWithChildren {
    className?: string;
    onClick?: (ev: React.MouseEvent) => void;
    onMouseLeave?: (ev: React.MouseEvent) => void;
    onBlur?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
}

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
}
