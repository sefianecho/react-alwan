import { useCallback, useEffect, useState } from 'react';
import { switchInputsSVG } from '../assets/svg/icons';
import type { inputsProps } from '../types';
import Button from './Button';
import Container from './Container';
import { HEX_FORMAT } from '../constants';

const Inputs = ({ formats, format, singleInput, opacity }: inputsProps) => {
    /**
     * Checks if inputs are a single input.
     */
    const isSingle = useCallback(() => format === HEX_FORMAT || singleInput, [format, singleInput]);

    /**
     * Gets fields to build.
     */
    const getFields = useCallback(
        () => (isSingle() ? [format] : (format + (opacity ? 'a' : '')).split('')),
        [isSingle, format, opacity]
    );

    const [fields, setFields] = useState<string[]>(getFields());
    const length = fields.length;

    /**
     * Update fields.
     */
    useEffect(() => {
        setFields(getFields());
    }, [getFields]);

    if (length) {
        return (
            <Container>
                <div className='alwan__inputs'>
                    {fields.map((field) => (
                        <label key={field}>
                            <input type='text' className='alwan__input' />
                            <span>{field}</span>
                        </label>
                    ))}
                </div>
                {length > 1 ? <Button>{switchInputsSVG}</Button> : null}
            </Container>
        );
    }

    return null;
};

export default Inputs;
