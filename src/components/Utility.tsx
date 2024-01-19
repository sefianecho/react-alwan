import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { checkSVG, clipboardSVG } from '../assets/svg/icons';
import type { utilityProps } from '../types';
import { ROOT } from '../constants';
import Button from './Button';

/**
 * Previews and copies current color.
 *
 * @param param0 - Props.
 */
const Utility = ({ preview, copy, color, disabled }: utilityProps) => {
    const [isCopied, setCopied] = useState(false);
    const [isFallback, setFallback] = useState(false);
    const fallbackInput = useRef<HTMLInputElement | null>(null);

    /**
     * Handles copy button click, copy current color.
     */
    const handleClick = () => {
        if (!isCopied) {
            const clipboard = navigator.clipboard;

            if (clipboard) {
                clipboard
                    .writeText(color)
                    .then(() => {
                        setCopied(true);
                    })
                    .catch(() => {
                        setFallback(true);
                    });
            } else {
                setFallback(true);
            }
        }
    };

    const copyButton = copy ? (
        <Button
            className='alwan__copy-button'
            onClick={handleClick}
            disabled={disabled}
            /**
             * Reset icon to the clipboard.
             */
            onBlur={() => {
                setCopied(false);
            }}
            /**
             * Trigger blur when mouse leaves.
             */
            onMouseLeave={(e) => {
                setCopied(false);
                e.currentTarget.blur();
            }}
        >
            {isCopied ? checkSVG : clipboardSVG}
        </Button>
    ) : null;

    /**
     * Fallback if browser doesn't support navigator.clipboard
     */
    useEffect(() => {
        if (isFallback && fallbackInput.current) {
            fallbackInput.current.select();
            ROOT.execCommand('copy');
            setCopied(true);
            setFallback(false);
        }
    }, [isFallback]);

    return (
        <>
            {preview ? (
                <div className='alwan__preview'>{copyButton}</div>
            ) : (
                copyButton
            )}{' '}
            {}
            {isFallback
                ? createPortal(
                      <input
                          style={{ position: 'fixed', opacity: 0 }}
                          defaultValue={color}
                          ref={fallbackInput}
                      />,
                      ROOT.body,
                  )
                : null}
        </>
    );
};

export default Utility;
