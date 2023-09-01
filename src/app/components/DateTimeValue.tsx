/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { useLang } from '../../_metronic/i18n/Metronici18n';

const DateTimeValue = (props: any) => {
    const { datas, handleClick } = props;
    const [value, setValue] = useState<string>("");
    const lang = useLang()

    useEffect(() => {
        if (datas) {
            try {
                if (lang === "en") {
                    try {
                        const newvlaue = dateFormat(new Date(datas), "mm/dd/yyyy HH:MM:ss")
                        setValue(newvlaue)
                    } catch (error) {

                    }
                } else {
                    try {
                        const newvlaue = dateFormat(new Date(datas), "dd.mm.yyyy HH:MM:ss")
                        setValue(newvlaue)
                    } catch (error) {

                    }
                }
            } catch (error) {

            }
        }
        // eslint-disable-next-line
    }, [datas])

    return (
        <td style={{ padding: '0px 10px', width: 226, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
            onClick={handleClick}
        >
            <a className='text-dark text-hover-primary d-block ' style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 100 }}>
                {value}
            </a>
        </td>
    )
}

export default DateTimeValue;