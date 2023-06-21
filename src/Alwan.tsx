import './assets/alwan.scss';
import Container from './components/Container';
import Inputs from './components/Inputs';
import Palette from './components/Palette';
import Sliders from './components/Sliders';
import Swatches from './components/Swatches';
import Utility from './components/Utility';

const Alwan = () => {
    return (
        <>
            <button type='button' className='alwan__button alwan__preset-button'></button>
            <div className='alwan'>
                <Palette />
                <Container>
                    <Utility />
                    <Sliders />
                </Container>
                <Inputs />
                <Swatches />
            </div>
        </>
    );
};

export default Alwan;
