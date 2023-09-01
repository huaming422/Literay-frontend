/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

const TextArea = (props: any) => {
    const { header, value, name, rows, handleChange, requiredText } = props;

    const handlechange = (event: any) => {
        const value = event.target.value;
        handleChange(name, value);
    }

    const classes = {
        margin: 0
    }
    return (
        <>
            <div className=' mb-2'>
                <span className={`fs-6 fw-bold mb-2 ${requiredText ? 'required' : ''}`}>
                    {
                        header
                    }
                </span>
                <i
                    className="fas fa-exclamation-circle ms-2 fs-7"
                    data-bs-toggle="tooltip"
                    title={""}
                ></i>
            </div>
            <textarea
                className="form-control"
                onChange={handlechange}
                style={{ padding: '3px', fontWeight: 100, fontSize: '13px' }}
                name={name}
                rows={rows}
                value={value ? value : ""}
            >
            </textarea>
        </>
    )
}

export default TextArea;