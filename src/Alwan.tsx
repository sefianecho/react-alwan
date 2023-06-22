import { useEffect, useState } from 'react';
import './assets/alwan.scss';
import Container from './components/Container';
import Inputs from './components/Inputs';
import Palette from './components/Palette';
import Sliders from './components/Sliders';
import Swatches from './components/Swatches';
import Utility from './components/Utility';
import type { alwanProps, colorFormat, colorState } from './types';
import { ALL_FORMATS, RGB_FORMAT } from './constants';

const Alwan = ({
    id,
    className,
    theme = 'light',
    toggle = true,
    preview = true,
    copy = true,
    opacity = true,
    inputs = true,
    format = 'rgb',
    singleInput = false,
    swatches = [],
    toggleSwatches = true,
}: alwanProps) => {
    const [formats, setFormats] = useState<colorFormat[]>([]);
    const [currentFormat, setCurrentFormat] = useState<colorFormat>(format);
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

    /**
     * Update input formats and current format index.
     */
    useEffect(() => {
        const formats =
            inputs === true ? ALL_FORMATS : ALL_FORMATS.filter((format) => (inputs || {})[format]);

        setFormats(formats);
        setCurrentFormat(formats.includes(format) ? format : RGB_FORMAT);
    }, [inputs, format]);

    return (
        <>
            <button
                type='button'
                className={`alwan__button alwan__preset-button${className ? ' ' + className : ''}`}
                /**
                 * Toggle color picker.
                 */
                onClick={() => {
                    if (toggle) {
                        setOpen(!isOpen);
                    }
                }}
            ></button>
            <div id={id} className={`alwan${isOpen ? ' alwan--open' : ''}`} data-theme={theme}>
                <Palette />
                <Container>
                    <Utility preview={preview} copy={copy} />
                    <Sliders opacity={opacity} />
                </Container>
                <Inputs
                    formats={formats}
                    format={currentFormat}
                    singleInput={singleInput}
                    opacity={opacity}
                    changeFormat={(format) => setCurrentFormat(format)}
                />
                <Swatches swatches={swatches} toggle={toggleSwatches} />
            </div>
        </>
    );
};

export default Alwan;
