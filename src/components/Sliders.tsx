import { useEffect } from 'react';
import type { slidersProps } from '../types';
import Slider from './Slider';

/**
 * Hue and Alpha sliders.
 *
 * @param param0 - Props.
 */
const Sliders = ({ opacity, updater, color, disabled, i18n }: slidersProps) => {
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
                aria-label={i18n.hue}
            />
            {opacity ? (
                <Slider
                    type='alpha'
                    value={color.a}
                    max={1}
                    step={0.01}
                    onChange={(e) => updater({ a: +e.currentTarget.value })}
                    disabled={disabled}
                    aria-label={i18n.alpha}
                />
            ) : null}
        </div>
    );
};

export default Sliders;
