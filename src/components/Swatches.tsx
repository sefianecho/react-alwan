import { useEffect, useState } from 'react';
import { caretSVG } from '../assets/svg/icons';
import Button from './Button';
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
                        <Button
                            key={index}
                            className='alwan__swatch'
                            style={{ '--alwan-color': swatch } as React.CSSProperties}
                        />
                    ))}
                </div>
                {toggle ? (
                    /**
                     * Toggle button.
                     */
                    <Button
                        className='alwan__toggle-button'
                        /**
                         * Toggle collapse swatches container.
                         */
                        onClick={() => {
                            setCollapsed(!collapsed);
                        }}
                    >
                        {caretSVG}
                    </Button>
                ) : null}
            </>
        );
    }

    return null;

    return (
        <>
            <div className='alwan__swatches'>
                <Button className='alwan__swatch' />
                <Button className='alwan__swatch' />
                <Button className='alwan__swatch' />
                <Button className='alwan__swatch' />
            </div>

            <Button className='alwan__toggle-button'>{caretSVG}</Button>
        </>
    );
};

export default Swatches;
