/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { useLang } from '../../_metronic/i18n/Metronici18n';
import { parseDicomDate } from '../../setup/utils/utils';

const DateValue = (props: any) => {
    const { date, handleClick } = props;
    const [value, setValue] = useState<string>("");
    const lang = useLang()

    useEffect(() => {
        const dates = parseDicomDate(date);
        if (dates) {
            try {
                if (lang === "en") {
                    const newvlaue = dateFormat(dates, "mm/dd/yyyy")
                    setValue(newvlaue)
                } else {
                    const newvlaue = dateFormat(dates, "dd.mm.yyyy")
                    setValue(newvlaue)
                }
            } catch (error) {

            }
        }
        // eslint-disable-next-line
    }, [date])

    return (
        <td style={{ padding: '0px 10px', borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
            onClick={handleClick}
        >
            <a className='text-dark text-hover-primary d-block ' style={{ cursor: 'pointer', fontSize: '13px', fontWeight: 100 }}>
                {value}
            </a>
        </td>
    )
}

export default DateValue;