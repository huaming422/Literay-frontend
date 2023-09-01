import * as React from 'react';
/* eslint-disable jsx-a11y/anchor-is-valid */
const NoDatas = () => {
    return (
        <tr className='bg-gray-100'>
            <td  style={{width: '100%' }} colSpan={17}>
                <div className='d-flex align-items-center justify-content-center'>
                    <a className='text-dark fw-bolder text-hover-primary fs-6'
                    style={{ width: 'max-content'  }}
                    >
                        No datas.
                    </a>
                </div>
            </td>
        </tr>
    )
}

export default NoDatas;