/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { useState, useEffect } from 'react';
import * as devices from '../redux/Devicesredux'
import DateValue from '../../../components/DateValue';
import DivideValue from '../../../components/DivideValue';
import DateTimeValue from '../../../components/DateTimeValue';
import TabCheckboxValue from '../../../components/TabCheckboxValue';
import TabHtmlview from '../../../components/TabHtmlview';
import 'react-toastify/dist/ReactToastify.css';
import { UserModel } from '../../auth/models/UserModel';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import { DSeriesColumnValues } from '../data';
import TextValue from '../../../components/TextValue';


const StudyTableItem = (props: any) => {
    const { indexing, headers, data, selectedRow, setSelectedRow } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");

    useEffect(() => {
        if (indexing % 2 === 0) {
            setOdd(true)
        } else {
            setOdd(false)
        }
    }, [indexing])

    const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
    const dispatch = useDispatch();

    const getDatas = () => {
        setSelectedRow(indexing)
        dispatch(devices.actions.getSeriesData([...DSeriesColumnValues]))
        // getDeviceConfigSettingsData(body)
        //   .then((res: any) => {
        //     let { data } = res;
        //     dispatch(item.actions.getDeviceConfigSettingTableData(data))
        //   })
        //   .catch((error: any) => {
        //     debugger
        //     setHasIssue(true);
        //   })
    }

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

    return (
        <tr className={background} onClick={getDatas}>
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
                    else if (item.field === 'study_date') {
                        return (
                            <DateValue
                                key={index}
                                date={data.MainDicomTags[item.tag].Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'accession_number') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag].Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'institution_name') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag].Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'referring_physician_name') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag].Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'study_instance_uid') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag].Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'study_id') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag].Value}
                                onClick={() => { }}
                            />
                        )
                    }
                    else if (item.field === 'req_proce_desc') {
                        return (
                            <TextValue
                                key={index}
                                value={data.MainDicomTags[item.tag].Value}
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