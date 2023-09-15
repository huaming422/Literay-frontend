/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState } from 'react';
import * as devices from '../redux/Devicesredux'
import DateValue from '../../../components/DateValue';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import TextValue from '../../../components/TextValue';
import { getSeriestData } from '../redux/DevicesCRUD';
import { KTSVG } from '../../../../_metronic/helpers';
const StudyTableItem = (props: any) => {
    const { parentId, indexing, headers, data, selectedRow, setSelectedRow, handleUpload, handleDownload, handlePreview, handleDelete } = props;
    const [background, setBackground] = useState<string>("");
    const [odd, setOdd] = useState<boolean>(false);

    const dispatch = useDispatch();
    const getDatas = () => {
        setSelectedRow(`${parentId}_${indexing}`)
        getSeriestData(data.ID)
            .then((res: any) => {
                let { data } = res;
                dispatch(devices.actions.getSeriesData(data))
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    React.useEffect(() => {
        if (`${parentId}_${indexing}` === selectedRow) {
            setBackground("bg-success")
        } else {
            if (indexing % 2 === 0) {
                setBackground("bg-gray-100")
                setOdd(true)
            } else {
                setBackground("")
                setOdd(false)
            }
        }
    }, [indexing, selectedRow, parentId])
    return (
        <tr className={background} onClick={getDatas} style={{ cursor: 'pointer' }}>
            {
                headers.map((item: any, index: number) => {
                    if (item.type === 'date') {
                        return (
                            <DateValue
                                key={index}
                                date={data.MainDicomTags[item.tag]?.Value}
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
                        className={`btn btn-icon ${!odd ? "btn-bg-light" : "btn-bg-white"} btn-active-color-primary btn-sm me-2`}
                        style={{ width: "30px", height: "30px" }}
                        data-bs-toggle="modal" data-bs-target="#delete-one-confirm-modal"
                        onClick={() => handlePreview(data.MainDicomTags['0020,000d']?.Value)}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen060.svg'
                            className='svg-icon-1 svg-icon-gray-800'
                        />
                    </button>
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
                        onClick={() => handleDelete(data.MainDicomTags['0008,0020']?.Value, data.ID)}
                    >
                        <KTSVG
                            path='/media/icons/duotune/general/gen027.svg'
                            className='svg-icon-2 svg-icon-gray-800'
                        />
                    </button>
                </div>
            </td>
        </tr >
    )
}

export default StudyTableItem;