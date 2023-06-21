import { clipboardSVG } from '../assets/svg/icons';
import Button from './Button';

const Utility = () => {
    return (
        <div className='alwan__preview'>
            <Button className='alwan__copy-button'>{clipboardSVG}</Button>
        </div>
    );
};

export default Utility;
