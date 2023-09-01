/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';

const Checkbox = (props: any) => {
    const {header, lang, data, definition, name, handleChange } = props;
    const [readonly, setReadOnly] = useState<boolean>(false);
    const [colors, setColor] = useState<string>("");

    const handlechange = (event: any) => {
        const value = event.target.checked;
        handleChange(name, value);
    }

    useEffect(() => {
        const objecttype = definition.filter((item: any) => item.name === 'objecttype')
        if (objecttype[0]?.attributes?.permission) {
            if (objecttype[0]?.attributes?.permission === 'readonly') {
                setReadOnly(true);
            } else {
                setReadOnly(false)
            }
        }

        const color = definition.filter((item: any) => item.name === 'color')
        if (color[0]) {
            if (color[0].value === "textBlue") {
                setColor("#4871b6");
            } else {
                const first2 = color[0].value.substring(0, 2);
                if (first2 === "0x")
                {
                    const realcolor = color[0].value.substring(2);
                    setColor(`#${realcolor}`);
                } else {
                    setColor(`#${color[0].value}`);
                }
            }
        }
    }, [definition])

    const classes = {
        width: '130px',
        color: colors,
        margin: 0
    }

    return (
        <>
            <p style={ classes }>
                {header[lang]}&nbsp;&nbsp;
            </p>
            <div className='form-check form-check-lg form-check-custom form-check-solid' style={{width: '200px'}}>
                <input
                    className='form-check-input widget-9-check'
                    type='checkbox'
                    name={name}
                    readOnly={readonly}
                    checked={parseInt(data[name]) === 1 ? true : false}
                    onChange={handlechange}
                />
            </div>
        </>
    )
}

export default Checkbox;