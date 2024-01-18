const Slider = (
    props: React.InputHTMLAttributes<HTMLInputElement> & {
        type: 'hue' | 'alpha';
    },
) => (
    <input
        className={`alwan__slider alwan__${props.type}`}
        {...{ ...props, type: 'range' }}
    />
);

export default Slider;
