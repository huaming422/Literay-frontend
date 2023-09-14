/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

const TextInput = (props: any) => {
    const { header, value, readOnly, type, name, handleChange } = props;

    const handlechange = (event: any) => {
        handleChange(name, event.target.value);
    }

    return (
        <div className='d-flex align-items-center pb-3'>
            <p style={{ margin: 0, whiteSpace: 'pre'}}>
                {header}&nbsp;&nbsp;:&nbsp;&nbsp;
            </p>
            <div className='w-100 d-flex justify-content-end'>
                <input
                    className="form-control"
                    onChange={handlechange}
                    style={{ padding: '3px', fontSize: '13px', fontWeight: 100 , maxWidth: '350px'}}
                    name={name}
                    readOnly={readOnly}
                    // disabled={readOnly}
                    type={type}
                    value={value}
                >
                </input>
            </div>
        </div>
    )
}

export default TextInput;