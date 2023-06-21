import { switchInputsSVG } from '../assets/svg/icons';
import Container from './Container';

const Inputs = () => {
    return (
        <Container>
            <div className='alwan__inputs'>
                <label>
                    <input type='text' className='alwan__input' />
                    <span>r</span>
                </label>
                <label>
                    <input type='text' className='alwan__input' />
                    <span>g</span>
                </label>
                <label>
                    <input type='text' className='alwan__input' />
                    <span>b</span>
                </label>
                <label>
                    <input type='text' className='alwan__input' />
                    <span>a</span>
                </label>
            </div>
            <button type='button' className='alwan__button'>
                {switchInputsSVG}
            </button>
        </Container>
    );
};

export default Inputs;
