import { clipboardSVG } from '../assets/svg/icons';
import type { utilityProps } from '../types';

/**
 * Previews and copies current color.
 *
 * @param param0 - Props.
 */
const Utility = ({ preview, copy, color }: utilityProps) => {
    const copyButton = copy ? (
        <button type='button' className='alwan__button alwan__copy-button'>
            {clipboardSVG}
        </button>
    ) : null;

    return (
        <>
            {preview ? (
                <div
                    className='alwan__preview'
                    style={{ '--alwan-color': color.rgb } as React.CSSProperties}
                >
                    {copyButton}
                </div>
            ) : (
                copyButton
            )}
        </>
    );
};

export default Utility;
