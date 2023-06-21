import { clipboardSVG } from '../assets/svg/icons';
import type { utilityProps } from '../types';
import Button from './Button';

/**
 * Previews and copies current color.
 *
 * @param param0 - Props.
 */
const Utility = ({ preview, copy }: utilityProps) => {
    const copyButton = copy ? <Button className='alwan__copy-button'>{clipboardSVG}</Button> : null;

    return <>{preview ? <div className='alwan__preview'>{copyButton}</div> : copyButton}</>;
};

export default Utility;
