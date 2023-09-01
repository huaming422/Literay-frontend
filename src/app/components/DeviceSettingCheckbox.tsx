/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useLang } from '../../_metronic/i18n/Metronici18n';

const Checkbox = (props: any) => {
    const { header, index, data, name, handleChange } = props;

    const handlechange = (event: any) => {
        const value = event.target.checked;
        if (value) {
            handleChange(index, "1");
        } else {
            handleChange(index, '0');
        }
    }
    const lang = useLang();

    return (
        <div className="col-md-3">
            <div className='d-flex align-items-center justify-content-between '>
                <p className='ml-2 m-0'>
                &nbsp;&nbsp;&nbsp;&nbsp;{header[lang]}&nbsp;&nbsp;
                </p>
                <div className='form-check form-check-lg form-check-custom form-check-solid'>
                    <input
                        className='form-check-input widget-9-check'
                        type='checkbox'
                        name={name}
                        checked={parseInt(data[index]) === 1 ? true : false}
                        onChange={handlechange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Checkbox;