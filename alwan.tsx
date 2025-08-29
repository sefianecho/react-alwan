import AlwanInstance from 'alwan';
import "alwan/dist/css/alwan.min.css";
import { alwanEventHandler, alwanOptions } from 'alwan/dist/js/types/src/types';
import { ReactElement, cloneElement, useEffect, useRef } from 'react';

interface AlwanProps {
    options?: alwanOptions;
    onChange?: alwanEventHandler;
    onColor?: alwanEventHandler;
    onOpen?: alwanEventHandler;
    onClose?: alwanEventHandler;
    refEl?: ReactElement<{ ref?: React.Ref<HTMLElement> }>;
}

const Alwan = ({
    refEl,
    options,
    onChange,
    onColor,
    onOpen,
    onClose
}: AlwanProps) => {
    const alwanRef = useRef(null);

    useEffect(() => {
        if (!alwanRef.current) {
            return;
        }

        const alwan = new AlwanInstance(alwanRef.current, options);
        onChange && alwan.on('change', onChange);
        onColor && alwan.on('color', onColor);
        onOpen && alwan.on('open', onOpen);
        onClose && alwan.on('close', onClose);

        return () => {
            alwan.destroy();
        }

    }, [options, onChange, onColor, onOpen, onClose]);

    return refEl ? cloneElement(refEl, { ref: alwanRef }) : <div ref={alwanRef}></div>;
}

export default Alwan;
