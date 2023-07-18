import { forwardRef } from 'react';

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    (props, ref) => (
        <button
            type='button'
            ref={ref}
            {...props}
            className={`alwan__button${props.className ? ' ' + props.className : ''}`}
        ></button>
    )
);

export default Button;
