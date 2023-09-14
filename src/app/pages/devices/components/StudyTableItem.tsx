/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState } from 'react';
import * as devices from '../redux/Devicesredux'
import DateValue from '../../../components/DateValue';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import TextValue from '../../../components/TextValue';
import { getSeriestData } from '../redux/DevicesCRUD';

const StudyTableItem = (props: any) => {
    const { parentId, indexing, headers, data, selectedRow, setSelectedRow } = props;
    const [background, setBackground] = useState<string>("");
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
            setBackground("bg-light-info")
        } else {
            if (indexing % 2 === 0) {
                setBackground("bg-gray-100")
            } else {
                setBackground("")
            }
        }
    }, [indexing, selectedRow, parentId])

    return (
        <tr className={background} onClick={getDatas} style={{cursor: 'pointer'}}>
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
                    else if (item.field === 'study_date') {
                        return (
                            <DateValue
                                key={index}
                                date={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'accession_number') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'institution_name') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'referring_physician_name') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'study_instance_uid') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'study_id') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'req_proce_desc') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag]?.Value}
                                onClick={() => { }}
                            />
                        )
                    } else {
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
            <td style={{ width: '100%', height: 40 }}>
            </td>
        </tr >
    )
}

export default StudyTableItem;