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
