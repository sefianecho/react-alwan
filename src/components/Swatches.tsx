import { caretSVG } from '../assets/svg/icons';
import Button from './Button';

const Swatches = () => {
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
