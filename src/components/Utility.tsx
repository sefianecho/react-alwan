import { clipboardSVG } from '../assets/svg/icons';

const Utility = () => {
    return (
        <div className='alwan__preview'>
            <button type='button' className='alwan__button alwan__copy-button'>
                {clipboardSVG}
            </button>
        </div>
    );
};

export default Utility;
