/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import DateValue from '../../../components/DateValue';
import DivideValue from '../../../components/DivideValue';
import DateTimeValue from '../../../components/DateTimeValue';
import TabCheckboxValue from '../../../components/TabCheckboxValue';
import TabHtmlview from '../../../components/TabHtmlview';
import 'react-toastify/dist/ReactToastify.css';
import { KTSVG } from '../../../../_metronic/helpers';
// import { useIntl } from 'react-intl';


const ImageTableItem = (props: any) => {
    const { indexing, headers, data, checkedRows, handleSelect } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");
    // const intl = useIntl()

    const isChecked = checkedRows!.includes(data.id);

    useEffect(() => {
        if (indexing % 2 === 0) {
            setOdd(true)
        } else {
            setOdd(false)
        }
    }, [indexing])

    const handleClick = () => {
    }

    const handleCheckChange = (event: any) => {
        handleSelect(data.id, event.target.checked)
    }

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
            <td style={{ paddingLeft: 5 }}>
                <div className='form-check form-check-sm form-check-custom form-check-solid justify-content-center'>
                    <input
                        className='form-check-input widget-9-check'
                        type='checkbox'
                        checked={isChecked}
                        onChange={handleCheckChange}
                    />
                </div>
            </td>
            {
                headers.map((item: any, index: number) => {
                    let objectType = "";
                    const definition = item.type;
                    if (definition) {
                        objectType = definition;
                    } else {
                        // console.log("Not fount objectType => ", xml);
                    }
                    if (objectType === 'date') {
                        return (
                            <DateValue
                                key={index}
                                datas={data[item.field]}
                                handleClick={handleClick}
                            />
                        )
                    }
                    else if (objectType === 'checkbox') {
                        return (
                            <TabCheckboxValue
                                key={index}
                                odd={true}
                                value={data[item.field]}
                            />
                        )
                    }
                    else if (objectType === 'html') {
                        return (
                            <TabHtmlview
                                key={index}
                                data={data[item.field]}
                                handleClick={handleClick}
                            />
                        )
                    }
                    else if (objectType === 'datetime') {
                        return (
                            <DateTimeValue
                                key={index}
                                datas={data[item.field]}
                                handleClick={handleClick}
                            />
                        )
                    }
                    else if (objectType === 'divide') {
                        return (
                            <DivideValue
                                key={index}
                                data={data}
                                handleClick={handleClick}
                            />
                        )
                    }
                    else {
                        return (
                            <td key={index} style={{ padding: '0px 10px', overflow: 'hidden', height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
                                onClick={handleClick}
                            >
                                <a className='text-dark  text-hover-primary d-block ' style={{ cursor: 'pointer', wordBreak: 'break-all', fontWeight: 100, fontSize: '13px', }}>
                                    {
                                        data[item.field]
                                    }
                                </a>
                            </td>
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