/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import { v4 as uuid } from 'uuid';

const DateField = (props: any) => {
    const { date, name, setFilters } = props;
    const [value, setValue] = useState<string>("");

    const handlechange = (event: any) => {
        let value = event.currentTarget.value;
        setValue(value);
        setFilters((filters: any) => ({ ...filters, studyDate: value }))
    }

    const getUid = () => {
        return uuid();
    }
    const id = getUid();

    useEffect(() => {
        if (date) {
            try {
                try {
                    const newvlaue = dateFormat(new Date(date), "mm/dd/yyyy")
                    setValue(newvlaue)
                } catch (error) {
                }
            } catch (error) {
            }
        } else {
            setValue("")
        }
        // eslint-disable-next-line
    }, [date])

    useEffect(() => {
        // @ts-ignore
        $(`#kt_datepicker_${id}`).flatpickr();
        // @ts-ignore
        $(`#kt_datepicker_${id}`).change((event: any) => {
            // @ts-ignore
            handlechange(event)
        })
        // eslint-disable-next-line
    }, []);

    return (

        <div className='d-flex align-items-center position-relative me-1'>
            <input
                className="form-control form-control-white form-control-sm"
                onChange={handlechange}
                name={name}
                value={value}
                placeholder="Study Date"
                id={`kt_datepicker_${id}`}
            >
            </input>
        </div>
    )
}

export default DateField;