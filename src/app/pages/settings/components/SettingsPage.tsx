/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import * as item from '../redux/Settingsredux'
import { TabContent } from './steps/TabContent';
import { getStatisticsData, getSystemInfoData } from '../redux/SettingsCRUD';

const SettingsPage = () => {
  const dispatch = useDispatch();

  const statistics: any = useSelector<RootState>(({ settings }) => settings.statistics, shallowEqual) as any;
  const systemInfo: any = useSelector<RootState>(({ settings }) => settings.systemInfo, shallowEqual) as any;

  const getDatas = () => {
    getSystemInfoData()
      .then((res: any) => {
        let { data } = res;
        dispatch(item.actions.getSystemInfoData(data))
      })
      .catch((error: any) => {
        console.warn("Error", error)
      })
    getStatisticsData()
      .then((res: any) => {
        let { data } = res;
        dispatch(item.actions.getStatisticsData(data))
      })
      .catch((error: any) => {
        console.warn("Error", error)
      })
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
                statistics={statistics}
                systemInfo={systemInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export { SettingsPage }
