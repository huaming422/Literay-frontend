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
import { KTSVG } from '../../../../_metronic/helpers';
import { StudyContent } from './steps/StudyContent';
import { UserModel } from '../../auth/models/UserModel';
import { RootState } from '../../../../setup';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { DStudyColumnValues } from '../data';


const TableItem = (props: any) => {
    const { indexing, headers, data, checkedRows, handleSelect } = props;
    const [odd, setOdd] = useState<boolean>(false);
    const [background, setBackground] = useState<string>("");

    const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
    const dispatch = useDispatch();
    const [totalData, setTotalData] = useState<any[]>([]);
  
    const columnValues: any = useSelector<RootState>(({ devices }) => devices.studyColumnValues, shallowEqual) as any;
  
    useEffect(() => {
      if (columnValues) {
        setTotalData(columnValues);
      }
    }, [columnValues])
  
  
    const getDatas = () => {
      dispatch(devices.actions.getStudyData(DStudyColumnValues))
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
        <>

            <tr className={background} onClick={getDatas}>
                <td style={{ width: '20px', height: 40, padding: '0px 5px 0px 5px ' }}>
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
            </tr >
            <tr>
                <td colSpan={12} style={{ padding: 0 }}>
                    <div id={`kt_job_4_${indexing}`} className="collapse fs-6 ms-1">
                        <div className="ps-10 pb-5" style={{ paddingRight: '10px' }}>
                            <StudyContent
                                id={data.id}
                                totalData={totalData}
                                setTotalData={setTotalData}
                                headers={DStudyColumnValues}
                            />
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TableItem;