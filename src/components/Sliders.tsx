import { useEffect } from 'react';
import type { slidersProps } from '../types';

/**
 * Hue and Alpha sliders.
 *
 * @param param0 - Props.
 */
const Sliders = ({ opacity, updater, color, disabled }: slidersProps) => {
    /**
     * Updates color state.
     *
     * @param param0 - Event.
     * @param channel - Color channel.
     */
    const handleChange = (
        { target, target: { valueAsNumber } }: React.ChangeEvent<HTMLInputElement>,
        channel: 'h' | 'a'
    ) => {
        updater({ [channel]: channel === 'h' ? 360 - valueAsNumber : valueAsNumber }, target);
    };

    /**
     * Resets the alpha component to 1, if the opacity prop changed to false.
     */
    useEffect(() => {
        if (!opacity) {
            updater({ a: 1 });
        }
    }, [opacity, updater]);

    return (
        <div className='alwan__sliders'>
            <input
                type='range'
                className='alwan__slider alwan__slider--hue'
                max={360}
                value={360 - color.h}
                onChange={(e) => handleChange(e, 'h')}
                disabled={disabled}
            />
            {opacity ? (
                <input
                    type='range'
                    className='alwan__slider alwan__slider--alpha'
                    style={{ '--alwan-rgb': color.opaque } as React.CSSProperties}
                    value={color.a}
                    max={1}
                    step={0.01}
                    onChange={(e) => handleChange(e, 'a')}
                    disabled={disabled}
                />
            ) : null}
        </div>
    );
};

export default Sliders;
