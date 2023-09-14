/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

const TextValue = (props: any) => {
    const { value, handleClick } = props;

    return (
        <td  style={{ padding: '0px 10px', overflow: 'hidden',  width: '100%', height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
            onClick={handleClick}
        >
            <a className='text-dark  text-hover-primary d-block ' style={{ cursor: 'pointer', wordBreak: 'break-all', fontWeight: 100, fontSize: '13px', }}>
                {
                    value
                }
            </a>
        </td>
    )
}

export default TextValue;