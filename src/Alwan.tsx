import { useState } from 'react';
import './assets/alwan.scss';
import Container from './components/Container';
import Inputs from './components/Inputs';
import Palette from './components/Palette';
import Sliders from './components/Sliders';
import Swatches from './components/Swatches';
import Utility from './components/Utility';
import type { colorState } from './types';
import Button from './components/Button';

const Alwan = () => {
    const [color, setColor] = useState<colorState>({
        h: 0,
        s: 0,
        l: 0,

        r: 0,
        g: 0,
        b: 0,
        a: 1,

        rgb: '',
        hsl: '',
        hex: '',
    });

    return (
        <>
            <Button className='alwan__preset-button' />
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
