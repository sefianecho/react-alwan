const Sliders = () => {
    return (
        <div className='alwan__sliders'>
            <input type='range' className='alwan__slider alwan__slider--hue' max={360} />
            <input
                type='range'
                className='alwan__slider alwan__slider--alpha'
                max={1}
                step={0.01}
            />
        </div>
    );
};

export default Sliders;
