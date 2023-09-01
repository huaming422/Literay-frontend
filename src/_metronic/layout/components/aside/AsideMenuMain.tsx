/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { AsideMenuItem } from './AsideMenuItem'
// import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub';

export function AsideMenuMain() {
  // const intl = useIntl();

  return (
    <>
      <AsideMenuItemWithSub to='/devices' title='Devices' hasBullet={true}>
        <AsideMenuItem to='/devices/1' title='Radiology' hasBullet={true} />
        <AsideMenuItem to='/devices/2' title='Ophthalmology' hasBullet={true} />
        <AsideMenuItem to='/devices/3' title='Description' hasBullet={true} />
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
        title="MOdality"
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/local-ae'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Local AE'
        fontIcon='bi-layers'
      />
    </>
  )
}
