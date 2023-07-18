const Slider = (props: React.InputHTMLAttributes<HTMLInputElement> & { type: 'hue' | 'alpha' }) => (
    <input
        className={`alwan__slider alwan__slider--${props.type}`}
        {...{ ...props, type: 'range' }}
    />
);

export default Slider;
