import { useState } from 'react';
import Alwan from '../src/components/Alwan';
import './App.scss';
import { alwanProps, colorFormat } from '../src/types';
import React from 'react';

const App = () => {
    const [options, setOptions] = useState<alwanProps>({
        id: 'picker',
        theme: 'light',
        toggle: true,
        popover: true,
        position: 'bottom-start',
        margin: 5,
        opacity: true,
        preview: true,
        copy: true,
        disabled: false,
        singleInput: false,
        closeOnScroll: false,
        toggleSwatches: true,
        value: 'red',
        inputs: {
            rgb: true,
            hsl: true,
            hex: true,
        },
        format: 'rgb',
        swatches: [],
        onChange(color) {
            console.log(color);
        },
        onOpen(color) {
            console.log(color);
        },
        onClose(color) {
            console.log(color);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
        >,
    ) => {
        const target = e.currentTarget;
        const { name, type, value } = target;

        if (type === 'checkbox') {
            if (name === 'inputs') {
                options.inputs = {
                    ...(options.inputs as Partial<
                        Record<colorFormat, boolean>
                    >),
                    [value]: (target as HTMLInputElement).checked,
                };
            } else {
                (options as unknown as Record<keyof alwanProps, boolean>)[
                    name as keyof alwanProps
                ] = (target as HTMLInputElement).checked;
            }
        } else if (type === 'textarea') {
            options.swatches = value.split(';');
        } else {
            (options as unknown as Record<keyof alwanProps, string>)[
                name as keyof alwanProps
            ] = value;
        }

        console.log(options.swatches);
        setOptions({ ...options });
    };

    const inputOption = (format: colorFormat) => {
        const inputs = options.inputs;

        if (typeof inputs === 'boolean') {
            return inputs;
        }

        if (inputs && inputs[format]) {
            return true;
        }

        return false;
    };

    return (
        <>
            <div className='container'>
                <div className='options-panel'>
                    <ul>
                        <li>
                            <label>
                                Theme
                                <select
                                    name='theme'
                                    value={options.theme}
                                    onChange={handleChange}
                                >
                                    <option value='light'>Light</option>
                                    <option value='dark'>Dark</option>
                                </select>
                            </label>
                        </li>

                        <li>
                            <label>
                                Toggle
                                <input
                                    type='checkbox'
                                    name='toggle'
                                    checked={options.toggle}
                                    onChange={handleChange}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Popover
                                <input
                                    type='checkbox'
                                    name='popover'
                                    checked={options.popover}
                                    onChange={handleChange}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Position
                                <select
                                    name='position'
                                    value={options.position}
                                    onChange={handleChange}
                                >
                                    <option value='top'>Top</option>
                                    <option value='top-start'>Top-Start</option>
                                    <option value='top-end'>Top-End</option>

                                    <option value='right'>Right</option>
                                    <option value='right-start'>
                                        Right-Start
                                    </option>
                                    <option value='right-end'>Right-End</option>

                                    <option value='bottom'>Bottom</option>
                                    <option value='bottom-start'>
                                        Bottom-Start
                                    </option>
                                    <option value='bottom-end'>
                                        Bottom-End
                                    </option>

                                    <option value='left'>Left</option>
                                    <option value='left-start'>
                                        Left-Start
                                    </option>
                                    <option value='left-end'>Left-End</option>
                                </select>
                            </label>
                        </li>

                        <li>
                            <label>
                                Margin
                                <input
                                    type='number'
                                    name='margin'
                                    onChange={handleChange}
                                    value={options.margin}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Preview
                                <input
                                    type='checkbox'
                                    name='preview'
                                    onChange={handleChange}
                                    checked={options.preview}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Opacity
                                <input
                                    type='checkbox'
                                    name='opacity'
                                    onChange={handleChange}
                                    checked={options.opacity}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Copy
                                <input
                                    type='checkbox'
                                    name='copy'
                                    onChange={handleChange}
                                    checked={options.copy}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Disabled
                                <input
                                    type='checkbox'
                                    name='disabled'
                                    onChange={handleChange}
                                    checked={options.disabled}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Single Input
                                <input
                                    type='checkbox'
                                    name='singleInput'
                                    onChange={handleChange}
                                    checked={options.singleInput}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Close on scroll
                                <input
                                    type='checkbox'
                                    name='closeOnScroll'
                                    onChange={handleChange}
                                    checked={options.closeOnScroll}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Toggle Swatches
                                <input
                                    type='checkbox'
                                    name='toggleSwatches'
                                    onChange={handleChange}
                                    checked={options.toggleSwatches}
                                />
                            </label>
                        </li>

                        <li>
                            <label>
                                Value
                                <input
                                    type='text'
                                    name='value'
                                    onChange={handleChange}
                                    value={options.value as string}
                                />
                            </label>
                        </li>

                        <li>
                            <span>
                                Inputs
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <label>
                                        RGB
                                        <input
                                            type='checkbox'
                                            name='inputs'
                                            value='rgb'
                                            onChange={handleChange}
                                            checked={inputOption('rgb')}
                                        />
                                    </label>

                                    <label>
                                        HEX
                                        <input
                                            type='checkbox'
                                            name='inputs'
                                            value='hex'
                                            onChange={handleChange}
                                            checked={inputOption('hex')}
                                        />
                                    </label>

                                    <label>
                                        HSL
                                        <input
                                            type='checkbox'
                                            name='inputs'
                                            value='hsl'
                                            onChange={handleChange}
                                            checked={inputOption('hsl')}
                                        />
                                    </label>
                                </div>
                            </span>
                        </li>

                        <li>
                            <label>
                                Format
                                <select
                                    name='format'
                                    onChange={handleChange}
                                    value={options.format}
                                >
                                    <option value='hex'>HEX</option>
                                    <option value='rgb'>RGB</option>
                                    <option value='hsl'>HSL</option>
                                </select>
                            </label>
                        </li>

                        <li>
                            <label>
                                Swatches
                                <textarea
                                    name='swatches'
                                    style={{
                                        resize: 'vertical',
                                        marginLeft: 10,
                                    }}
                                    onChange={handleChange}
                                    value={options.swatches?.join(';')}
                                ></textarea>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className='preview'>
                    <div style={{ textAlign: 'center' }}>
                        <label className='label' htmlFor='picker'>
                            Choose a color
                        </label>
                        <Alwan {...options} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
