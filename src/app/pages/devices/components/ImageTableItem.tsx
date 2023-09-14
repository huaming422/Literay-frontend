/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import DateValue from '../../../components/DateValue';
import 'react-toastify/dist/ReactToastify.css';
import { KTSVG } from '../../../../_metronic/helpers';
import TextValue from '../../../components/TextValue';

const ImageTableItem = (props: any) => {
    const { indexing, headers, data } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");

    useEffect(() => {
        if (indexing % 2 === 0) {
            setOdd(true)
        } else {
            setOdd(false)
        }
    }, [indexing])

    useEffect(() => {
        if (odd) {
            setBackground("bg-gray-100");
        } else {
            setBackground("");
        }
        // eslint-disable-next-line
    }, [data, odd])

    return (
        <tr className={background}>
            {
                headers.map((item: any, index: number) => {

                    if (item.field === 'name') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    if (item.field === 'sop_instance_uid') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    if (item.field === 'image_position_patient') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    if (item.field === 'image_orientation_patient') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    if (item.field === 'image_comments') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    if (item.field === 'create_date') {
                        return (
                            <DateValue
                                key={index}
                                date={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                })
            }
            <td style={{ width: '100%', minWidth: '0px', height: 40, padding: '0px 5px 0px 5px ' }}>
                <div className='d-flex justify-content-center'>
                    <button
                        className={`btn btn-icon ${!odd ? "btn-bg-light" : "btn-bg-white"} btn-active-color-danger btn-sm`}
                        style={{ width: "30px", height: "30px" }}
                        data-bs-toggle="modal" data-bs-target="#delete-one-confirm-modal"
                        onClick={() => { }}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen060.svg'
                            className='svg-icon-3'
                        />
                    </button>
                </div>
            </td>
        </tr >
    )
}

export default ImageTableItem;