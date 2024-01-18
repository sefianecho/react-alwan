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
     * Updates color state.
     *
     * @param param0 - Event.
     * @param channel - Color channel.
     */
    const handleChange = (
        {
            target,
            target: { valueAsNumber },
        }: React.ChangeEvent<HTMLInputElement>,
        channel: 'h' | 'a',
    ) => {
        updater(
            {
                [channel]:
                    channel === 'h' ? 360 - valueAsNumber : valueAsNumber,
            },
            target,
        );
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
        <div>
            <Slider
                type='hue'
                max={360}
                value={360 - color.h}
                onChange={(e) => handleChange(e, 'h')}
                disabled={disabled}
            />
            {opacity ? (
                <Slider
                    type='alpha'
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
