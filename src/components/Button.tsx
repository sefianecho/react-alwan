import type { buttonProps } from '../types';

/**
 * Creates a button.
 *
 * @param param0 - Props.
 */
const Button = ({
    children,
    className,
    style,
    onClick,
    onMouseLeave,
    onBlur,
    disabled,
}: buttonProps) => (
    <button
        type='button'
        className={`alwan__button ${className}`}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        onBlur={onBlur}
        disabled={disabled}
        style={style}
    >
        {children}
    </button>
);

export default Button;
