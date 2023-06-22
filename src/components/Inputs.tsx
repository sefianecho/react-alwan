import { useCallback, useEffect, useState } from 'react';
import { switchInputsSVG } from '../assets/svg/icons';
import { colorState, inputValues, type inputsProps } from '../types';
import Container from './Container';
import { HEX_FORMAT } from '../constants';
import { stringify } from '../colors/stringify';

const Inputs = ({
    color,
    formats,
    format,
    singleInput,
    opacity,
    updater,
    changeFormat,
}: inputsProps) => {
    /**
     * Checks if inputs are a single input.
     */
    const isSingle = useCallback(() => format === HEX_FORMAT || singleInput, [format, singleInput]);

    /**
     * Gets fields to build.
     */
    const getFields = useCallback(
        () =>
            (isSingle() ? [format] : (format + (opacity ? 'a' : '')).split('')) as Array<
                keyof colorState
            >,
        [isSingle, format, opacity]
    );
    const [values, setValues] = useState<inputValues>({ ...color });
    const [fields, setFields] = useState<Array<keyof colorState>>(getFields());
    const length = formats.length;

    /**
     * Handles switch inputs button click.
     */
    const handleClick = () => {
        changeFormat(formats[(formats.indexOf(format) + 1) % length]);
    };

    /**
     * Handles inputs change.
     *
     * @param param0 - Event.
     * @param field - Input identifier.
     */
    const handleChange = (
        { target, target: { value } }: React.ChangeEvent<HTMLInputElement>,
        field: keyof colorState
    ) => {
        values[field] = value;
        if (field !== format) {
            value = stringify(values, format);
        }

        updater(field === format ? value : stringify(values, format), target);
        setValues({ ...values });
    };

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
                            <input
                                type='text'
                                className='alwan__input'
                                value={values[field]}
                                onChange={(e) => handleChange(e, field)}
                            />
                            <span>{field}</span>
                        </label>
                    ))}
                </div>
                {length > 1 ? (
                    <button type='button' className='alwan__button' onClick={handleClick}>
                        {switchInputsSVG}
                    </button>
                ) : null}
            </Container>
        );
    }

    return null;
};

export default Inputs;
