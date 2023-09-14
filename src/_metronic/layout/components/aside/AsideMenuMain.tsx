/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react'
import { AsideMenuItem } from './AsideMenuItem'
// import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../setup';
import * as devices from '../../../../app/pages/modalityConfig/redux/DeviceConfigredux'
import { DModalityColumnValues } from '../../../../app/pages/modalityConfig/data';

export function AsideMenuMain() {
  const dispatch = useDispatch();
  const [totalData, setTotalData] = useState<any[]>([]);

  const columnValues: any = useSelector<RootState>(({ modalityConfig }) => modalityConfig.deviceConfigSettingColumnValues, shallowEqual) as any;

  useEffect(() => {
    if (columnValues) {
      setTotalData(columnValues);
    }
  }, [columnValues])


  const getDatas = () => {
    dispatch(devices.actions.getDeviceConfigSettingTableData(DModalityColumnValues))
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
    <>
      <AsideMenuItemWithSub
        to='/devices'
        title='Devices'
        icon='/media/icons/duotune/graphs/gra008.svg'
        fontIcon='bi-person'
      >
        {
          totalData?.map((item: any, index: any) => {
            return (
              <AsideMenuItem key={index} to={`/devices/${item.id}`} title={item.ae_title} hasBullet={true} />
            )
          })
        }
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {"Settings"}</span>
        </div>
      </div>


      <AsideMenuItem
        to='/modality'
        icon='/media/icons/duotune/art/art002.svg'
        title="Modality"
        fontIcon='bi-app-indicator'
      />
      {/* <AsideMenuItem
        to='/local-ae'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Local AE'
        fontIcon='bi-layers'
      /> */}
      <AsideMenuItem
        to='/settings'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Settings'
        fontIcon='bi-layers'
      />
    </>
  )
}
