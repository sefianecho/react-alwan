import type { slidersProps } from '../types';

/**
 * Hue and Alpha sliders.
 *
 * @param param0 - Props.
 */
const Sliders = ({ opacity }: slidersProps) => {
    return (
        <div className='alwan__sliders'>
            <input type='range' className='alwan__slider alwan__slider--hue' max={360} />
            {opacity ? (
                <input
                    type='range'
                    className='alwan__slider alwan__slider--alpha'
                    max={1}
                    step={0.01}
                />
            ) : null}
        </div>
    );
};

export default Sliders;
