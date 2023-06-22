import { useEffect, useState } from 'react';
import { caretSVG } from '../assets/svg/icons';
import type { swatchesProps } from '../types';

/**
 * Creates color swatches buttons.
 *
 * @param param0 - Props.
 */
const Swatches = ({ swatches, toggle }: swatchesProps) => {
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
                <div className={`alwan__swatches${collapsed ? ' alwan--collapse' : ''}`}>
                    {swatches.map((swatch, index) => (
                        <button
                            type='button'
                            key={index}
                            className='alwan__button alwan__swatch'
                            style={{ '--alwan-color': swatch } as React.CSSProperties}
                        ></button>
                    ))}
                </div>
                {toggle ? (
                    /**
                     * Toggle button.
                     */
                    <button
                        type='button'
                        className='alwan__button alwan__toggle-button'
                        /**
                         * Toggle collapse swatches container.
                         */
                        onClick={() => {
                            setCollapsed(!collapsed);
                        }}
                    >
                        {caretSVG}
                    </button>
                ) : null}
            </>
        );
    }

    return null;
};

export default Swatches;
