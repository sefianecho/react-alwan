import { caretSVG } from '../assets/svg/icons';

const Swatches = () => {
    return (
        <>
            <div className='alwan__swatches'>
                <button type='button' className='alwan__swatch'></button>
                <button type='button' className='alwan__swatch'></button>
                <button type='button' className='alwan__swatch'></button>
            </div>
            <button type='button' className='alwan__button alwan__toggle-button'>
                {caretSVG}
            </button>
        </>
    );
};

export default Swatches;
