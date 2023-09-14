/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import DateValue from '../../../components/DateValue';
import 'react-toastify/dist/ReactToastify.css';
import { KTSVG } from '../../../../_metronic/helpers';
import { StudyContent } from './steps/StudyContent';
import { DStudyHead } from '../data';
import { getStudytData } from '../redux/DevicesCRUD';
import TextValue from '../../../components/TextValue';

const PatientTableItem = (props: any) => {
    const { indexing, headers, data, checkedRows, handleSelect, parentWidth, selectedRow, setSelectedRow, selectedStudyRow, setSelectedStudyRow } = props;
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
            setBackground("bg-gray-300")
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
                    <div className="d-flex align-items-center collapsible toggle collapsed mb-0" data-toggle="collapse" data-target={`#kt_job_4_${indexing}`} aria-expanded="true" aria-controls="faq1" role="button">
                        <div className="btn btn-sm btn-icon mw-20px btn-active-color-primary">
                            <KTSVG
                                className="svg-icon toggle-on svg-icon-primary svg-icon-1"
                                path="/media/icons/duotune/general/gen036.svg"
                            />
                            <KTSVG
                                className="svg-icon toggle-off svg-icon-1"
                                path="/media/icons/duotune/general/gen035.svg"
                            />
                        </div>
                    </div>
                </td>
                <td style={{ height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8", zIndex: 100000 }}>
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

                        if (item.field === 'name') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags.PatientName}
                                    onClick={() => { }}
                                />
                            )
                        }
                        else if (item.field === 'patient_id') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags.PatientID}
                                    onClick={() => { }}
                                />
                            )
                        }
                        else if (item.field === 'patient_birthdate') {
                            return (
                                <DateValue
                                    key={index}
                                    date={data.MainDicomTags.PatientBirthDate}
                                    onClick={() => { }}
                                />
                            )
                        }
                        else if (item.field === 'patient_sex') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags.PatientSex}
                                    onClick={() => { }}
                                />
                            )
                        }
                        else if (item.field === 'other_patient_ids') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags?.OtherPatientIDs || ""}
                                    onClick={() => { }}
                                />
                            )
                        } else {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags?.OtherPatientIDs || ""}
                                    onClick={() => { }}
                                />
                            )
                        }
                    })
                }
            </tr >
            <tr>
                <td colSpan={8} style={{ padding: 0 }}>
                    <div id={`kt_job_4_${indexing}`} className="collapse fs-6 ms-1">
                        <div className="ps-10 pb-5">
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