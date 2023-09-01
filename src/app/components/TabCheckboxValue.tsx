/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

const TabCheckboxValue = (props: any) => {
    const { value, odd } = props;
    const handlechange = () => {

    }

    return (
        <td style={{ padding: '0px 10px', overflow: 'hidden', height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
        >
            <div className='d-flex justify-content align-items-center'>
                <div className={`form-check form-check-lg form-check-custom ${!odd ? "form-check-solid" : ""}`}>
                    <input
                        className='form-check-input widget-9-check'
                        style={{ height: '28px', width: '28px' }}
                        type='checkbox'
                        readOnly={true}
                        checked={value ? value : false}
                        onChange={handlechange}
                    />
                </div>
            </div>
        </td>
    )
}

export default TabCheckboxValue;