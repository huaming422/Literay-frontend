/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import * as item from '../redux/LocalAEConfigredux'
import { TabContent } from './steps/TabContent';
import { DModalityColumnValues, DModalityHead } from '../data';

const DeviceConfigPage = () => {
  const dispatch = useDispatch();
  const [totalData, setTotalData] = useState<any[]>([]);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const columnValues: any = useSelector<RootState>(({ modalityConfig }) => modalityConfig.deviceConfigSettingColumnValues, shallowEqual) as any;
  useEffect(() => {
    if (columnValues) {
      setTotalData(columnValues);
    }
  }, [columnValues])

  const getDatas = () => {
    dispatch(item.actions.getDeviceConfigSettingTableData(DModalityColumnValues))
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


  useEffect(() => {
    getDatas();
    // eslint-disable-next-line
  }, [])

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='stepper stepper-links d-flex flex-column'>
          <div className={`mx-auto mw-1500px  w-100`} >
            <div className='current' >
              <TabContent
                totalData={totalData}
                setTotalData={setTotalData}
                headers={DModalityHead}
                setHasChanged={setHasChanged}
                hasChanged={hasChanged}
                getDatas={getDatas}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export { DeviceConfigPage }
