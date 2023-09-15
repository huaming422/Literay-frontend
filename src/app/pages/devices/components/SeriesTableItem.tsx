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
        // eslint-disable-next-line
    }, [indexing, selectedRow])

    useEffect(() => {
        if (odd) {
            setBackground("bg-gray-100 collapsible toggle collapsed");
        } else {
            setBackground(" collapsible toggle collapsed");
        }
        // eslint-disable-next-line
    }, [data, odd])

    useEffect(() => {
        getDatas();
        // eslint-disable-next-line
    }, [data.ParentStudy])

    return (
        <>
            <tr className={background} onClick={getDatas} data-toggle="collapse" data-target={`#kt_series_${data.ParentStudy}_${indexing}`} aria-expanded="true" aria-controls="faq1" role="button">
                {
                    headers.map((item: any, index: number) => {
                        if (item.type === 'date') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.MainDicomTags[item.tag].Value}
                                    onClick={() => { }}
                                />
                            )
                        }
                        else if (item.type === 'status') {
                            return (
                                <TextValue
                                    key={index}
                                    value={data.Status}
                                    onClick={() => { }}
                                />
                            )
                        }
                        else {
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
                    <div id={`kt_series_${data.ParentStudy}_${indexing}`} className="collapse fs-6 ms-1">
                        <div className="ps-10 pb-5 " style={{ background: '#f1f1f1' }}>
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