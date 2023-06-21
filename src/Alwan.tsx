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

const Alwan = ({
    id,
    className,
    theme = 'light',
    toggle = true,
    preview = true,
    copy = true,
    opacity = true,
}: alwanProps) => {
    const [isOpen, setOpen] = useState(false);
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
            <Button
                className={`alwan__preset-button${className ? ' ' + className : ''}`}
                /**
                 * Toggle color picker.
                 */
                onClick={() => {
                    if (toggle) {
                        setOpen(!isOpen);
                    }
                }}
            />
            <div id={id} className={`alwan${isOpen ? ' alwan--open' : ''}`} data-theme={theme}>
                <Palette />
                <Container>
                    <Utility preview={preview} copy={copy} />
                    <Sliders opacity={opacity} />
                </Container>
                <Inputs />
                <Swatches />
            </div>
        </>
    );
};

export default Alwan;
