/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { StudyContent } from './steps/StudyContent';
import { DStudyHead } from '../data';
import { getStudytData } from '../redux/DevicesCRUD';
import TextValueAction from '../../../components/TextValueAction';
import DateValueAction from '../../../components/DateValueAction';
import { KTSVG } from '../../../../_metronic/helpers';

const PatientTableItem = (props: any) => {
    const { indexing, headers, data, checkedRows, handleSelect, parentWidth, selectedRow, setSelectedRow, selectedStudyRow, setSelectedStudyRow, handleUpload, handleDownload, handleDelete } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");
    const [totalData, setTotalData] = useState<any[]>([]);

    const getDatas = () => {
        setSelectedRow(indexing)
        getStudytData(data.ID)
            .then((res: any) => {
                let { data } = res;
                setTotalData(data)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    const isChecked = checkedRows!.includes(data.ID);

    React.useEffect(() => {
        if (indexing === selectedRow) {
            setBackground("bg-warning")
        } else {
            if (indexing % 2 === 0) {
                setBackground("bg-gray-100")
                setOdd(true)
            } else {
                setBackground("")
                setOdd(false)
            }
        }
    }, [indexing, selectedRow])

    const handleCheckChange = (event: any) => {
        handleSelect(data.ID, event.target.checked)
    }

    useEffect(() => {
        if (odd) {
            setBackground("bg-gray-100 collapsible toggle collapsed");
        } else {
            setBackground(" collapsible toggle collapsed");
        }
        // eslint-disable-next-line
    }, [data, odd])



    return (
        <>
            <tr className={background} onClick={getDatas} style={{ cursor: 'pointer' }}>
                <td style={{ width: '40px', height: 40, padding: '0px 5px 0px 5px ' }}>
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

                        if (item.type === 'date') {
                            return (
                                <DateValueAction
                                    key={index}
                                    indexing={indexing}
                                    date={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        else {
                            return (
                                <TextValueAction
                                    key={index}
                                    indexing={indexing}
                                    value={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                    })
                }
                <td style={{ width: '100%', minWidth: '0px', height: 40, padding: '0px 5px 0px 5px ' }}>
                    <div className='d-flex justify-content-center'>
                        <button
                            className={`btn btn-icon ${!odd ? "btn-bg-light" : "btn-bg-white"} btn-active-color-success me-2`}
                            style={{ width: "30px", height: "30px" }}
                            data-bs-toggle="modal" data-bs-target="#delete-one-confirm-modal"
                            onClick={() => handleUpload(data.ID)}
                        >
                            <KTSVG
                                path='/media/icons/duotune/arrows/arr078.svg'
                                className='svg-icon-2 svg-icon-gray-800'
                            />
                        </button>
                        <button
                            className={`btn btn-icon ${!odd ? "btn-bg-light" : "btn-bg-white"} btn-active-color-info me-2`}
                            style={{ width: "30px", height: "30px" }}
                            data-bs-toggle="modal" data-bs-target="#delete-one-confirm-modal"
                            onClick={() => handleDownload(data.ID)}
                        >
                            <KTSVG
                                path='/media/icons/duotune/files/fil021.svg'
                                className='svg-icon-2 svg-icon-gray-800'
                            />
                        </button>
                        <button
                            className={`btn btn-icon ${!odd ? "btn-bg-light" : "btn-bg-white"} btn-active-color-danger `}
                            style={{ width: "30px", height: "30px" }}
                            data-bs-toggle="modal" data-bs-target="#delete-one-confirm-modal"
                            onClick={() => handleDelete(data.MainDicomTags['0010,0010']?.Value, data.ID)}
                        >
                            <KTSVG
                                path='/media/icons/duotune/general/gen027.svg'
                                className='svg-icon-2 svg-icon-gray-800'
                            />
                        </button>
                    </div>
                </td>
            </tr >
            <tr>
                <td colSpan={8} style={{ padding: 0 }}>
                    <div id={`kt_job_4_${indexing}`} className="collapse fs-6 ms-1">
                        <div className="ps-10 pb-5" style={{ background: 'azure' }}>
                            <StudyContent
                                id={data.ID}
                                totalData={totalData}
                                parentWidth={parentWidth}
                                setTotalData={setTotalData}
                                headers={DStudyHead}
                                selectedRow={selectedStudyRow}
                                setSelectedRow={setSelectedStudyRow}
                            />
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default PatientTableItem;