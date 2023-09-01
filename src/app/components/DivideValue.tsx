/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLang } from '../../_metronic/i18n/Metronici18n';

const DivideValue = (props: any) => {
    const { data, handleClick } = props;
    const [from, setFrom] = useState<string>("");
    const lang = useLang()
    const [color, setColor] = useState<string>("text-dark");

    useEffect(() => {
        try {
            if (lang === "en") {
                setFrom("from")
            } else {
                setFrom("von")
            }
        } catch (error) {

        }
        // eslint-disable-next-line
    }, [lang])

    useEffect(() => {
        const used = data['licenceqtyused'] ? data['licenceqtyused'] : "0";
        const total = data['licenceqty'] ? data['licenceqty'] : "0";
        try {
            if (parseInt(used) > parseInt(total)) {
                setColor('text-danger')
            } else {
                setColor('text-dark')
            }
        } catch (error) {
        }
    }, [data])

    return (
        <td style={{ padding: '0px 10px', overflow: 'hidden', height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
            onClick={handleClick}
        >
            <a className={`${color}  text-hover-primary d-block `} style={{ cursor: 'pointer', wordBreak: 'break-all', maxHeight: 40, fontWeight: 100, fontSize: '13px', }}>
                {data['licenceqtyused']} {from} {data['licenceqty'] ? data['licenceqty'] : '0'}
            </a>
        </td>
    )
}

export default DivideValue;