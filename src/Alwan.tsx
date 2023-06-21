import { useState } from 'react';
import './assets/alwan.scss';
import Container from './components/Container';
import Inputs from './components/Inputs';
import Palette from './components/Palette';
import Sliders from './components/Sliders';
import Swatches from './components/Swatches';
import Utility from './components/Utility';
import type { alwanProps, colorState } from './types';
import Button from './components/Button';

const Alwan = ({ id, className, theme = 'light' }: alwanProps) => {
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
            <Button className={`alwan__preset-button${className ? ' ' + className : ''}`} />
            <div id={id} className='alwan' data-theme={theme}>
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
