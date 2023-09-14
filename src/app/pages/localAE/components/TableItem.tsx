/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import DateValue from '../../../components/DateValue';
import DivideValue from '../../../components/DivideValue';
import DateTimeValue from '../../../components/DateTimeValue';
import TabCheckboxValue from '../../../components/TabCheckboxValue';
import TabHtmlview from '../../../components/TabHtmlview';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { KTSVG } from '../../../../_metronic/helpers';
import { EditDeviceConfigModal } from './EditDeviceConfigModal ';
import { useIntl } from 'react-intl';


const TableItem = (props: any) => {
    const { indexing, headers, data, handleEdit, handleDelete, checkedRows, handleSelect } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");
    const intl = useIntl()

    const isChecked = checkedRows!.includes(data.id);

    useEffect(() => {
        if (indexing % 2 === 0) {
            setOdd(true)
        } else {
            setOdd(false)
        }
    }, [indexing])

    const handleClick = () => {
        setIsOpen(true);
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
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

    const handledelete = () => {
        // @ts-ignore
        Swal.fire({
            text:  intl.formatMessage({ id: 'SEARCH.WOULD.DELETE.COMPANY.PREFIX' }) + '"' + data.ae_title + '"' + intl.formatMessage({ id: 'SEARCH.WOULD.DELETE.COMPANY.SUBFIX' }),
            icon: "warning",
            showCancelButton: true,
            buttonsStyling: false,
            confirmButtonText: intl.formatMessage({ id: 'SEARCH.DELETE' }),
            cancelButtonText: intl.formatMessage({ id: 'SEARCH.CANCEL' }),
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-active-light"
            }
        }).then(async function (result: any) {
            if (result.value) {
             handleDelete(data.id);
            } else if (result.dismiss === 'cancel') {
                
            }
        });
    }

    const customStyles = {
        content: {
            backgroundColor: 'transparent',
            display: 'flex',
            border: 'none',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            minHeight: '100%',
            padding: 0
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 920
        }
    };

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
                        onClick={handledelete}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-3'
                        />
                    </button>
                </div>
            </td>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
                contentLabel="Edit"
            >
                <EditDeviceConfigModal
                    closeModal={closeModal}
                    index={indexing}
                    datas={data}
                    handleEdit={handleEdit}
                />
            </Modal>
        </tr >
    )
}

export default TableItem;