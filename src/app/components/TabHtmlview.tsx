/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import "./htmlview.scss"

const TabHtmlview = (props: any) => {
    const { data, handleClick } = props;

    return (
        <td style={{ padding: '0px 10px', overflow: 'hidden', height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
            onClick={handleClick}
        >
            <div  dangerouslySetInnerHTML={{ __html: data }} />
        </td>
    )
}

export default TabHtmlview;