/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { KTSVG } from '../../../../_metronic/helpers';
import { DImagesHead } from '../data';
import { ImagesContent } from './steps/ImagesContent';
import { getImagesData } from '../redux/DevicesCRUD';
import TextValue from '../../../components/TextValue';

const SeriesTableItem = (props: any) => {
    const { indexing, headers, data, parentWidth, selectedRow, setSelectedRow } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");
    const [totalData, setTotalData] = useState<any[]>([]);

    const getDatas = () => {
        setSelectedRow(indexing)
        getImagesData(data.ID)
            .then((res: any) => {
                let { data } = res;
                setTotalData(data)
            })
            .catch((error: any) => {
                console.log(error);
            })
    }

    React.useEffect(() => {
        if (indexing === selectedRow) {
            setBackground("bg-light-primary")
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
            <tr className={background} onClick={getDatas}>
                <td style={{ width: '40px', height: 40, padding: '0px 5px 0px 5px ' }}>
                    <div className="d-flex align-items-center collapsible toggle collapsed mb-0" data-toggle="collapse" data-target={`#kt_series_4_${indexing}`} aria-expanded="true" aria-controls="faq1" role="button">
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
                {
                    headers.map((item: any, index: number) => {
                        if (item.field === 'name') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag].Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'status') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.Status}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'modality') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'station_name') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'operators_name') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'contrast_bolus_agent') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'protocal_name') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'series_instance_uid') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag]?.Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        if (item.field === 'series_number') {
                            return (
                                <TextValue
                                    key={index}
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
            <tr>
                <td colSpan={18} style={{ padding: 0 }}>
                    <div id={`kt_series_4_${indexing}`} className="collapse fs-6 ms-1">
                        <div className="ps-10 pb-5">
                            <ImagesContent
                                id={data.id}
                                totalData={totalData}
                                parentWidth={parentWidth}
                                setTotalData={setTotalData}
                                headers={DImagesHead}
                            />
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default SeriesTableItem;