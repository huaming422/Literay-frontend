/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

const SeriesTextValueAction = (props: any) => {
    const { parent,indexing, value, handleClick } = props;

    return (
        <td style={{ padding: '0px 10px', overflow: 'hidden', height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
            data-toggle="collapse" data-target={`#kt_series_${parent}_${indexing}`} aria-expanded="true" aria-controls="faq1" role="button"
            onClick={handleClick}
        >
            <a className='text-dark d-block ' style={{ cursor: 'pointer', wordBreak: 'break-all', fontWeight: 100, fontSize: '13px', }}>
                {
                    value
                }
            </a>
        </td>
    )
}

export default SeriesTextValueAction;