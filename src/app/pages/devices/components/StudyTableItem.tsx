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


const StudyTableItem = (props: any) => {
    const { indexing, headers, data, checkedRows, handleSelect } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");
    const isChecked = checkedRows!.includes(data.id);

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
      dispatch(devices.actions.getSeriesData(DSeriesColumnValues))
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
        <tr className={background} onClick={getDatas}>
            <td style={{padding: 0}}>
                <div className='form-check form-check-sm w-40x form-check-custom form-check-solid justify-content-center'>
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
                                handleClick={() => {}}
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
                                handleClick={() => {}}
                            />
                        )
                    }
                    else if (objectType === 'datetime') {
                        return (
                            <DateTimeValue
                                key={index}
                                datas={data[item.field]}
                                handleClick={() => {}}
                            />
                        )
                    }
                    else if (objectType === 'divide') {
                        return (
                            <DivideValue
                                key={index}
                                data={data}
                                handleClick={() => {}}
                            />
                        )
                    }
                    else {
                        return (
                            <td key={index} style={{ padding: '0px 10px', overflow: 'hidden', height: 40, borderRight: "solid 1px #cbc8c8", borderLeft: "solid 1px #cbc8c8" }}
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
        </tr >
    )
}

export default StudyTableItem;