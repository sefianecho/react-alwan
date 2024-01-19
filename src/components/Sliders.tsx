import { useEffect } from 'react';
import type { slidersProps } from '../types';
import Slider from './Slider';

/**
 * Hue and Alpha sliders.
 *
 * @param param0 - Props.
 */
const Sliders = ({ opacity, updater, color, disabled }: slidersProps) => {
    /**
     * Resets the alpha component to 1, if the opacity prop changed to false.
     */
    useEffect(() => {
        if (!opacity) {
            updater({ a: 1 });
        }
    }, [opacity, updater]);

    return (
        <div>
            <Slider
                type='hue'
                max={360}
                value={color.h}
                onChange={(e) => updater({ h: +e.currentTarget.value })}
                disabled={disabled}
            />
            {opacity ? (
                <Slider
                    type='alpha'
                    value={color.a}
                    max={1}
                    step={0.01}
                    onChange={(e) => updater({ a: +e.currentTarget.value })}
                    disabled={disabled}
                />
            ) : null}
        </div>
    );
};

export default Sliders;
