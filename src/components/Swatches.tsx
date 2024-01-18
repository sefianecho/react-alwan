import { useEffect, useState } from 'react';
import { caretSVG } from '../assets/svg/icons';
import type { swatchesProps } from '../types';
import Button from './Button';

/**
 * Creates color swatches buttons.
 *
 * @param param0 - Props.
 */
const Swatches = ({ swatches, toggle, updater, disabled }: swatchesProps) => {
    const [collapsed, setCollapsed] = useState(false);

    /**
     * Updates state if toggleSwatches changes.
     */
    useEffect(() => {
        setCollapsed(toggle);
    }, [toggle]);

    if (Array.isArray(swatches) && swatches.length) {
        return (
            <>
                <div
                    className={`alwan__swatches${collapsed ? ' alwan--collapse' : ''}`}
                >
                    {swatches.map((swatch, index) => (
                        <Button
                            key={index}
                            className='alwan__swatch'
                            style={{ '--color': swatch } as React.CSSProperties}
                            onClick={(e) => {
                                updater(swatch, e.currentTarget);
                            }}
                            disabled={disabled}
                        />
                    ))}
                </div>
                {toggle ? (
                    /**
                     * Toggle button.
                     */
                    <Button
                        className='alwan__toggle-button'
                        onClick={() => {
                            setCollapsed(!collapsed);
                        }}
                        disabled={disabled}
                    >
                        {caretSVG}
                    </Button>
                ) : null}
            </>
        );
    }

    return null;
};

export default Swatches;
