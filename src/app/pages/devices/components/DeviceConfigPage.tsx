/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { updateDeviceConfigData, deleteDeviceConfigData, getDeviceConfigSettingsData } from '../redux/DevicesCRUD';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import * as devices from '../redux/Devicesredux'
import { TabContent } from './steps/PatientContent';
import { UserModel } from '../../auth/models/UserModel';
import { DPatientColumnValues, DPatientHead, DSeriesHead } from '../data';
import { SeriesContent } from './steps/SeriesContent';

const DeviceConfigPage = (props: any) => {
  const { id } = props;
  const user: UserModel = useSelector<RootState>(({ auth }) => auth.user, shallowEqual) as UserModel
  const dispatch = useDispatch();
  const [totalData, setTotalData] = useState<any[]>([]);
  const [seriesTotalData, setSeriesTotalData] = useState<any[]>([]);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const columnValues: any = useSelector<RootState>(({ devices }) => devices.patientColumnValues, shallowEqual) as any;
  const seriesColumnValues: any = useSelector<RootState>(({ devices }) => devices.seriesColumnValues, shallowEqual) as any;

  useEffect(() => {
    if (columnValues) {
      setTotalData(columnValues);
    }
  }, [columnValues])
  useEffect(() => {
    if (seriesColumnValues) {
      setSeriesTotalData(seriesColumnValues);
    }
  }, [seriesColumnValues])


  const getDatas = () => {
    dispatch(devices.actions.getPatientData(DPatientColumnValues))
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
  }, [id])

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='stepper stepper-links d-flex flex-column'>
          <div className={`mx-auto mw-2000px  w-100`} >
            <div className='current' >
              <TabContent
                totalData={totalData}
                setTotalData={setTotalData}
                headers={DPatientHead}
                setHasChanged={setHasChanged}
                hasChanged={hasChanged}
                getDatas={getDatas}
              />
              {
                seriesColumnValues?.length > 0 &&
                <SeriesContent
                  totalData={seriesTotalData}
                  setTotalData={setSeriesTotalData}
                  headers={DSeriesHead}
                  setHasChanged={setHasChanged}
                  hasChanged={hasChanged}
                />
              }

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export { DeviceConfigPage }
