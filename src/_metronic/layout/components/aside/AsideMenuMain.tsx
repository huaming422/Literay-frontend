/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react'
import { AsideMenuItem } from './AsideMenuItem'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';
import { getModalityNames } from '../../../../app/pages/modalityConfig/redux/DeviceConfigCRUD';

export function AsideMenuMain() {
  const [totalData, setTotalData] = useState<any[]>([]);

  const getDatas = () => {
    getModalityNames()
      .then((res: any) => {
        let { data } = res;
        setTotalData(data);
      })
      .catch((error: any) => {
      })
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
              <AsideMenuItem key={index} to={`/devices/${item}`} title={item} hasBullet={true} />
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
